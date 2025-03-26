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

  useEffect(() => {
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

      const result = await response.json();

      if (response.ok) {
        if (result.cartDeleted) {
          localStorage.removeItem("cart_id");
          console.log("Cart_id deleted");
        }

        const refreshResponse = await fetch("/api/cart/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id,
          }),
        });

        fetchCart();

        if (refreshResponse.ok) {
          const refreshResult = await refreshResponse.json();
          setCartItems(refreshResult.cartItems);
        }

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          address,
          payment_method: paymentMethod,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        const refreshResponse = await fetch("/api/cart/get", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user.id }),
        });

        if (refreshResponse.ok) {
          const { cartItems } = await refreshResponse.json();
          setCartItems(cartItems);
        }

        localStorage.removeItem("cart_id");
        setAddress("");
        setPaymentMethod("Карта");
        fetchCart();

        toast.success(result.message);
        setIsOrderModalOpen(false);
      } else {
        toast.error(result.error || "Ошибка при оформлении заказа");
      }
    } catch (error) {
      console.error("Ошибка оформления:", error);
      toast.error("Произошла непредвиденная ошибка");
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

  if (!cartItems) {
    return (
      <div>
        <Header />
        <div className="flex flex-col items-center justify-center my-10">
          <p className="text-lg font-normal text-center title-color font-roboto">
            Ваша корзина пуста
          </p>
          <div className="mt-6">
            <Link
              href="/catalog"
              className="text-xl font-normal main-button font-roboto"
            >
              Перейти в каталог
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container relative">
        <h1 className="my-8 text-4xl font-bold title-color">Корзина</h1>
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center my-10">
            <p className="text-lg font-normal text-center title-color font-roboto">
              Ваша корзина пуста
            </p>
            <div className="mt-6">
              <Link
                href="/catalog"
                className="text-xl font-normal main-button font-roboto"
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
                className="flex flex-col items-center justify-between pb-4 md:flex-row"
              >
                <div className="flex items-center space-x-4 text-color">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="object-cover w-24 h-24"
                  />
                  <div>
                    <h2 className="text-xl font-semibold title-color">
                      {item.name}
                    </h2>
                    <p className="text-lg text-color">
                      {item.discount ? (
                        <>
                          <span className="text-gray-600 line-through">
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
                        className="flex items-center justify-center flex-shrink-0 px-2 py-1 font-normal transition-all duration-300 ease-in-out bg-gray-200 rounded hover:bg-gray-300 font-roboto min-w-8"
                      >
                        -
                      </button>
                      <span className="font-normal font-roboto text-color">
                        {item.count}
                      </span>
                      <button
                        onClick={() =>
                          updateCount(item.product_id, item.count + 1)
                        }
                        className="flex items-center justify-center flex-shrink-0 px-2 py-1 font-normal transition-all duration-300 ease-in-out bg-gray-200 rounded hover:bg-gray-300 font-roboto min-w-8"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteProduct(item)}
                  className="px-4 py-2 text-sm font-normal border delete-button font-roboto"
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
                  className="w-full mt-4 text-xl font-normal main-button font-roboto"
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
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold title-color">
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
              <div className="flex justify-end w-full space-x-4">
                <button
                  onClick={() => setIsOrderModalOpen(false)}
                  className="px-4 py-2 font-normal border rounded-md cancel-button font-roboto"
                >
                  Отмена
                </button>
                <button
                  onClick={handleCreateOrder}
                  className="px-4 py-2 font-normal main-button font-roboto"
                >
                  Подтвердить заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold title-color">
              Удалить товар из корзины?
            </h2>
            <div className="flex justify-end w-full space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 font-normal border rounded-md cancel-button font-roboto"
              >
                Отмена
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 font-normal border rounded-md main-button font-roboto"
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
