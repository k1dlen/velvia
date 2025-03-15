"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./header";
import Footer from "./footer";
import Register from "./register";
import Login from "./login";
import Logout from "./logout";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      router.push(parsedUser.id_role === 2 ? "/admin" : "/profile");
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        return;
      }

      const user = JSON.parse(storedUser);

      const response = await fetch("/api/order/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Header />
      {!user ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
          <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
            {showRegister ? (
              <Register setUser={setUser} />
            ) : (
              <Login setUser={setUser} />
            )}
            <button
              onClick={() => setShowRegister(!showRegister)}
              className="w-full text-center font-roboto text-lg hover:underline"
            >
              {showRegister
                ? "Уже есть аккаунт? Войти"
                : "Нет аккаунта? Зарегистрироваться"}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 my-10">
          <div className="container bg-white shadow-lg rounded-lg p-8 w-full text-color">
            <h1 className="font-playfair text-3xl font-semibold text-center mb-4 title-color ">
              Добро пожаловать, {user.full_name}
            </h1>
            <h2 className="font-playfair text-2xl font-semibold title-color my-2">
              Ваши данные:
            </h2>
            <p className="font-roboto">Имя: {user.full_name}</p>
            <p className="font-roboto">Телефон: {user.phone}</p>
            <div>
              <h2 className="font-playfair text-2xl font-semibold title-color my-2">
                Ваши заказы:
              </h2>
              {orders.map((order) => (
                <div key={order.order_id}>
                  <p className="font-roboto">Номер заказа: {order.order_id}</p>
                  <p className="font-roboto">Дата заказа: {order.order_date}</p>
                  <p className="font-roboto">Стоимость: {order.total_amount}</p>
                  <p className="font-roboto">Статус: {order.order_status}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Logout setUser={setUser} />
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
