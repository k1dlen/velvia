"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Карта");
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          toast.error("Пожалуйста, авторизуйтесь, чтобы просмотреть корзину.");
          router.push("/profile");
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
        toast.error("Ошибка при загрузке корзины.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [router]);

  const removeFromCart = async (product_id) => {
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
        toast.success("Товар удален из корзины!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      } else {
        toast.error("Ошибка при удалении товара из корзины!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Ошибка:", error);
      toast.error("Произошла ошибка при удалении товара из корзины", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  const updateCount = async (product_id, newCount) => {
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
        toast.success("Количество товара обновлено!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      } else {
        toast.error("Ошибка при обновлении количества товара!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Ошибка:", error);
      toast.error("Произошла ошибка при обновлении количества товара", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
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
        toast.error("Пожалуйста, авторизуйтесь");
        router.push("/login");
        return;
      }

      const user = JSON.parse(storedUser);

      if (!address) {
        toast.error("Введите адрес доставки");
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
        toast.success("Заказ оформлен!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
        setCartItems([]);
        setIsOrderModalOpen(false);
      } else {
        toast.error("Ошибка при оформлении заказа", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Ошибка оформления:", error);
      toast.error("Ошибка при оформлении заказа", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  const handleDeleteProduct = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      removeFromCart(productToDelete.product_id);
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
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
          <div className="flex flex-col items-center justify-center my-10">
            <p className="text-center text-lg title-color font-roboto font-normal">
              Ваша корзина пуста
            </p>
            <div className="mt-6">
              <Link
                href="/catalog"
                className="main-button font-roboto font-normal text-xl"
              >
                Перейти в каталог
              </Link>
            </div>
          </div>
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
                          updateCount(item.product_id, item.count - 1)
                        }
                        disabled={item.count <= 1}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-all ease-in-out duration-300 font-roboto font-normal min-w-8 flex-shrink-0 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="font-roboto font-normal text-color">
                        {item.count}
                      </span>
                      <button
                        onClick={() =>
                          updateCount(item.product_id, item.count + 1)
                        }
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-all ease-in-out duration-300 font-roboto font-normal min-w-8 flex-shrink-0 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteProduct(item)}
                  className="px-4 py-2 border delete-button font-roboto font-normal text-sm"
                >
                  Удалить
                </button>
              </div>
            ))}

            <div className="flex justify-end mt-8">
              <div className="py-6">
                <h2 className="text-2xl font-semibold title-color text-end">
                  Итого: ₽ {calculateTotal().toFixed(2)}
                </h2>
                <button
                  onClick={() => setIsOrderModalOpen(true)}
                  className="main-button font-roboto font-normal text-xl mt-4 w-full"
                >
                  Оформить заказ
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
              <div className="flex justify-end space-x-4 w-full">
                <button
                  onClick={() => setIsOrderModalOpen(false)}
                  className="px-4 py-2 border rounded-md cancel-button font-roboto font-normal"
                >
                  Отмена
                </button>
                <button
                  onClick={handleCreateOrder}
                  className="px-4 py-2 main-button font-roboto font-normal"
                >
                  Подтвердить заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="absolute inset-0 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold title-color mb-4">
              Удалить товар из корзины?
            </h2>
            <div className="flex justify-end space-x-4 w-full">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border rounded-md cancel-button font-roboto font-normal"
              >
                Отмена
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 border rounded-md main-button font-roboto font-normal"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
