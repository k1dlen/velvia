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
      console.log(parsedUser);
      setUser(parsedUser);
    }
  }, []);

  const fetchOrders = async () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return;
    }

    const user = JSON.parse(storedUser);

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
        <h1 className="font-playfair text-3xl font-semibold mb-6 text-center title-color my-20 py-20">
          У вас нет доступа к данной странице, вернитесь на главную
        </h1>
        <button
          className="main-button px-4 py-2"
          onClick={() => router.push("/")}
        >
          Главная
        </button>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Header />
        <h1 className="font-playfair text-3xl font-semibold mb-6 text-center title-color my-20 py-20">
          Пожалуйста, авторизуйтесь
        </h1>
        <button
          className="main-button px-4 py-2"
          onClick={() => router.push("/login")}
        >
          Войти
        </button>
        <Footer />
      </>
    );
  }

  if (user && user.id_role === 2) {
    return (
      <>
        <Header />

        <div className="container">
          <h1 className="font-playfair text-3xl font-semibold mb-6 text-center title-color my-4">
            Панель администратора
          </h1>

          <h2 className="font-playfair text-2xl font-semibold mb-6 text-center title-color my-4">
            Заказы
          </h2>

          {orders.map((order) => (
            <div
              key={order.order_id}
              className="text-color font-roboto text-2xl mb-4"
            >
              <p>Номер заказа: {order.order_id}</p>
              <p>Дата заказа: {order.order_date}</p>
              <p>Имя: {order.full_name}</p>
              <p>Телефон: {order.phone}</p>
              <p>Адрес: {order.address}</p>
              <p>Способ оплаты: {order.payment_method}</p>
              <p>
                Статус: {order.order_status}
                <br />
                {order.id_status === 1 && (
                  <>
                    <button
                      className="mr-2 my-2 main-button text-xl"
                      onClick={() => updateStatus(order.order_id, 2)}
                    >
                      Принять
                    </button>
                    <button
                      className="mr-2 my-2 cancel-button text-xl"
                      onClick={() => updateStatus(order.order_id, 3)}
                    >
                      Отклонить
                    </button>
                  </>
                )}
              </p>
              <hr className="my-4" />
            </div>
          ))}
        </div>

        <Footer />
      </>
    );
  }
}
