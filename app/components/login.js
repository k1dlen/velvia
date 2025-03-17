"use client";

import { useState } from "react";

export default function Login({ setUser }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ login, password }),
    });

    if (res.ok) {
      const { user } = await res.json();
      console.log("Received user login:", user);

      const cartData = await fetch("/api/cart/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user.id }),
      }).then((res) => res.json());

      console.log("Received cart login:", cartData);

      if (cartData && cartData.cartItems && cartData.cartItems.length > 0) {
        localStorage.setItem("cart_id", cartData.cartItems[0].cart_id);
      }

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center p-5">
      <h1 className="font-playfair text-3xl font-semibold mb-6 text-center title-color">
        Авторизация
      </h1>
      <form className="space-y-4" onSubmit={handleLogin}>
        <input
          className="w-full p-3 border border-gray-300 rounded-md text-color focus:ring-2 focus:outline-none"
          type="text"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          className="w-full p-3 border border-gray-300 rounded-md text-color focus:ring-2 focus:outline-none"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="mt-4 w-full main-button">Войти</button>
      </form>
    </div>
  );
}
