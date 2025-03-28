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

  const formatPhoneNumber = (value) => {
    let numbers = value.replace(/\D/g, "");

    if (numbers.startsWith("7") || numbers.startsWith("8")) {
      numbers = numbers.substring(1);
    }

    numbers = numbers.substring(0, 10);

    let formatted = "";

    if (numbers.length > 0) {
      formatted += "+7 ";
      formatted += " (" + numbers.substring(0, 3);
    }
    if (numbers.length >= 4) {
      formatted += ") " + numbers.substring(3, 6);
    }
    if (numbers.length >= 7) {
      formatted += "-" + numbers.substring(6, 8);
    }
    if (numbers.length >= 9) {
      formatted += "-" + numbers.substring(8, 10);
    }

    return formatted;
  };

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formattedPhone });
  };

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
      <h1 className="mb-6 text-3xl font-semibold text-center font-playfair title-color">
        Регистрация
      </h1>
      <form className="space-y-4" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Логин"
          value={formData.login}
          onChange={(e) => setFormData({ ...formData, login: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md text-color focus:ring-2 focus:outline-none"
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full p-3 border border-gray-300 rounded-md text-color focus:ring-2 focus:outline-none"
          required
        />
        <input
          type="text"
          placeholder="ФИО"
          value={formData.full_name}
          onChange={(e) =>
            setFormData({ ...formData, full_name: e.target.value })
          }
          className="w-full p-3 border border-gray-300 rounded-md text-color focus:ring-2 focus:outline-none"
          required
        />
        <input
          type="tel"
          placeholder="Телефон"
          value={formData.phone}
          onChange={handlePhoneChange}
          className="w-full p-3 border border-gray-300 rounded-md text-color focus:ring-2 focus:outline-none"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md text-color focus:ring-2 focus:outline-none"
          required
        />
        <button type="submit" className="w-full mt-4 main-button">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
