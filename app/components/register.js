"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register({ setUser }) {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    full_name: "",
    phone: "",
    email: "",
  });

  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          login: formData.login,
          password: formData.password,
        }),
      });

      if (loginRes.ok) {
        const { user } = await loginRes.json();
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        router.push(user.id_role === 2 ? "/admin" : "/profile");
      }
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center p-5">
      <h1 className="font-playfair text-3xl font-semibold mb-6 text-center title-color">
        Регистрация
      </h1>
      <form className="space-y-4" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Логин"
          value={formData.login}
          onChange={(e) => setFormData({ ...formData, login: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md text-color focus:ring-2 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full p-3 border border-gray-300 rounded-md text-color focus:ring-2 focus:outline-none"
        />
        <input
          type="text"
          placeholder="ФИО"
          value={formData.full_name}
          onChange={(e) =>
            setFormData({ ...formData, full_name: e.target.value })
          }
          className="w-full p-3 border border-gray-300 rounded-md text-color focus:ring-2 focus:outline-none"
        />
        <input
          type="tel"
          placeholder="Телефон"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md text-color focus:ring-2 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md text-color focus:ring-2 focus:outline-none"
        />
        <button type="submit" className="mt-4 w-full main-button">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
