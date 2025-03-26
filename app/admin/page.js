"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } else if (!storedUser) {
      router.push("/profile");
      return;
    } else if (storedUser && user.id_role !== 2) {
      router.push("/profile");
      return;
    }
  }, []);

  const fetchOrders = async () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/profile");
      return;
    }

    const response = await fetch("/api/order/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setOrders(data.orders);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (error) {
      console.error("Error:", error);
    }
  }, [error]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch("/api/order/update-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_id: orderId, new_status: newStatus }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === updatedOrder.id ? { ...order, ...updatedOrder } : order
          )
        );
        toast.success("Статус заказа обновлен!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });

        fetchOrders();
      } else {
        const errorData = await response.json();
        console.error(errorData.error);
      }
    } catch (error) {
      console.error("Ошибка обновления статуса:", error);
    }
  };

  if (user && user.id_role === 1) {
    return (
      <>
        <Header />
        <div className="container">
          <h1 className="mt-20 mb-6 text-3xl font-semibold text-center font-playfair title-color">
            У вас нет доступа к данной странице, вернитесь на главную
          </h1>
          <div className="mb-10 text-center">
            <button
              className="px-4 py-2 main-button"
              onClick={() => router.push("/")}
            >
              Главная
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Header />
        <div className="container">
          <h1 className="mt-20 mb-6 text-3xl font-semibold text-center font-playfair title-color">
            У вас нет доступа к данной странице, вернитесь на главную
          </h1>
          <div className="mb-10 text-center">
            <button
              className="px-4 py-2 main-button"
              onClick={() => router.push("/")}
            >
              Главная
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (user && user.id_role === 2) {
    return (
      <>
        <Header />

        <div className="container">
          <h1 className="my-4 mb-6 text-3xl font-semibold text-center font-playfair title-color">
            Панель администратора
          </h1>

          <h2 className="my-4 mb-6 text-2xl font-semibold text-center font-playfair title-color">
            Заказы
          </h2>

          {orders.map((order) => (
            <div
              key={order.order_id}
              className="mb-4 transition-all duration-300 ease-in-out border rounded-lg shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between p-4 cursor-pointer">
                <h3 className="text-lg font-medium font-roboto title-color">
                  Заказ №{order.order_id}
                </h3>
              </div>

              <div className="p-4 pt-0 transition-all duration-300 ease-in-out border-t animate-slideDown">
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div>
                    <p className="font-roboto text-color">Дата заказа:</p>
                    <p className="font-medium font-roboto">
                      {order.order_date}
                    </p>
                  </div>
                  <div>
                    <p className="font-roboto text-color">Имя:</p>
                    <p className="font-medium font-roboto">{order.full_name}</p>
                  </div>
                  <div>
                    <p className="font-roboto text-color">Телефон:</p>
                    <p className="font-medium font-roboto">{order.phone}</p>
                  </div>
                  <div>
                    <p className="font-roboto text-color">Адрес:</p>
                    <p className="font-medium font-roboto">{order.address}</p>
                  </div>
                  <div>
                    <p className="font-roboto text-color">Способ оплаты:</p>
                    <p className="font-medium font-roboto">
                      {order.payment_method}
                    </p>
                  </div>
                  <div>
                    <p className="font-roboto text-color">Статус:</p>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        order.order_status === "Доставлен"
                          ? "bg-green-100 text-green-800"
                          : order.order_status === "Отменен"
                          ? "bg-red-100 text-red-800"
                          : order.order_status === "В пути"
                          ? "bg-orange-100 text-orange-800"
                          : order.order_status === "Ожидает доставки"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.order_status === "В обработке"
                          ? "bg-indigo-100 text-indigo-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.order_status}
                    </span>
                  </div>
                </div>

                {order.id_status === 1 && (
                  <div className="my-2">
                    <button
                      className="my-2 mr-2 text-xl main-button"
                      onClick={() => updateStatus(order.order_id, 2)}
                    >
                      Начать обработку
                    </button>
                    <button
                      className="my-2 mr-2 text-xl cancel-button"
                      onClick={() => updateStatus(order.order_id, 3)}
                    >
                      Отклонить
                    </button>
                  </div>
                )}

                {(order.id_status === 2 ||
                  order.id_status === 4 ||
                  order.id_status === 6) && (
                  <div className="my-2">
                    <select
                      className="p-2 text-xl border rounded-lg"
                      onChange={(e) =>
                        updateStatus(order.order_id, Number(e.target.value))
                      }
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Выберите статус
                      </option>
                      <option value="4">В пути</option>
                      <option value="5">Доставлен</option>
                      <option value="3">Отменен</option>
                      <option value="6">Ожидает доставки</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <Footer />
      </>
    );
  }
}
