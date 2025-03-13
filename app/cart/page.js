"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Image from "next/image";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Карта");
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          alert("Пожалуйста, авторизуйтесь, чтобы просмотреть корзину.");
          router.push("/login");
          return;
        }

        const user = JSON.parse(storedUser);
        const user_id = user.id;

        const response = await fetch("/api/cart/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id,
          }),
        });

        if (!response.ok) {
          throw new Error("Не удалось загрузить корзину");
        }

        const data = await response.json();
        setCartItems(data.cartItems);
        console.log("Received cartItems:", data.cartItems);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [router]);

  const removeFromCart = async (product_id) => {
    const confirmDelete = window.confirm(
      "Вы уверены, что хотите удалить товар из корзины?"
    );
    if (!confirmDelete) return;

    try {
      const storedUser = localStorage.getItem("user");
      const user = JSON.parse(storedUser);
      const user_id = user.id;

      const response = await fetch("/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          product_id,
        }),
      });

      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.product_id !== product_id)
        );
        alert("Товар удален из корзины");
      } else {
        alert("Ошибка при удалении товара из корзины");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла ошибка при удалении товара из корзины");
    }
  };

  const updateQuantity = async (product_id, newCount) => {
    try {
      const storedUser = localStorage.getItem("user");
      const user = JSON.parse(storedUser);
      const user_id = user.id;

      const response = await fetch("/api/cart/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          product_id,
          count: newCount,
        }),
      });

      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.product_id === product_id ? { ...item, count: newCount } : item
          )
        );
      } else {
        alert("Ошибка при обновлении количества товара");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла ошибка при обновлении количества товара");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const discountedPrice = item.discount
        ? item.price * (1 - item.discount / 100)
        : item.price;
      return total + discountedPrice * item.count;
    }, 0);
  };

  const handleCreateOrder = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        alert("Пожалуйста, авторизуйтесь");
        router.push("/login");
        return;
      }

      const user = JSON.parse(storedUser);

      if (!address) {
        alert("Введите адрес доставки");
        return;
      }

      const response = await fetch("/api/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          address,
          payment_method: paymentMethod,
        }),
      });

      if (response.ok) {
        alert("Заказ оформлен!");
        setCartItems([]);
        setIsOrderModalOpen(false);
      }
    } catch (error) {
      console.error("Ошибка оформления:", error);
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <h1 className="container text-center">Загрузка корзины...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <h1 className="container text-center text-red-500">{error}</h1>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container relative">
        <h1 className="text-4xl font-bold title-color my-8">Корзина</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-lg title-color">Ваша корзина пуста</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between pb-4"
              >
                <div className="flex items-center space-x-4 text-color">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="w-24 h-24 object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold title-color">
                      {item.name}
                    </h2>
                    <p className="text-lg text-color">
                      {" "}
                      {item.discount ? (
                        <>
                          <span className="line-through text-gray-600">
                            ₽ {item.price}
                          </span>{" "}
                          <span className="text-red-600">
                            ₽{" "}
                            {(
                              item.price -
                              (item.price * item.discount) / 100
                            ).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span>₽ {item.price}</span>
                      )}
                    </p>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product_id, item.count - 1)
                        }
                        disabled={item.count <= 1}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span>{item.count}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product_id, item.count + 1)
                        }
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.product_id)}
                  className="px-4 py-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded transition-colors duration-300"
                >
                  Удалить
                </button>
              </div>
            ))}

            <div className="flex justify-end mt-8">
              <div className="p-6">
                <h2 className="text-2xl font-semibold title-color">
                  Итого: ₽ {calculateTotal().toFixed(2)}
                </h2>
                <button
                  onClick={() => setIsOrderModalOpen(true)}
                  className="main-button font-roboto font-normal text-2xl mt-4 w-full"
                >
                  Заказать
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />

      {isOrderModalOpen && (
        <div className="absolute inset-0 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold title-color mb-4">
              Оформление заказа
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-color">
                  Адрес доставки
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Введите адрес доставки"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-color">
                  Способ оплаты
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="card">Карта</option>
                  <option value="cash">Наличные</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsOrderModalOpen(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                  Отмена
                </button>
                <button
                  onClick={handleCreateOrder}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Подтвердить заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
