"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiUser, FiShoppingCart } from "react-icons/fi";

export default function Header() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    const storedCartId = localStorage.getItem("cart_id");
    if (storedCartId) {
      setCartId(storedCartId);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex flex-wrap items-center justify-between">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center mb-2 md:mb-0">
          <Image
            src="/images/logo.svg"
            alt="Логотип"
            width={100}
            height={100}
          />
        </Link>

        <nav className="flex w-auto gap-10 p-4 text-2xl font-normal text-center nav sm:hidden md:flex lg:flex font-roboto lg:p-0 text-color">
          <Link
            href="/"
            className="hover:text-[#8b7355] transition-all duration-300 ease-in-out"
          >
            Главная
          </Link>
          <Link
            href="/catalog"
            className="hover:text-[#8b7355] transition-all duration-300 ease-in-out"
          >
            Каталог
          </Link>
          <Link
            href="/about"
            className="hover:text-[#8b7355] transition-all duration-300 ease-in-out"
          >
            О нас
          </Link>
          <Link
            href="#footer"
            className="hover:text-[#8b7355] transition-all duration-300 ease-in-out"
          >
            Контакты
          </Link>
        </nav>

        <div className="items-center gap-3 px-3 sm:hidden md:flex lg:flex">
          <div className="items-center gap-3 sm:hidden md:flex lg:flex">
            {user ? (
              <Link href="/profile" className="relative text-4xl text-color">
                <FiUser className="icon" />
                <span className="absolute top-0 w-2 h-2 bg-green-500 rounded-full -right-1 animate-pulse"></span>
              </Link>
            ) : (
              <Link href="/profile" className="relative text-4xl">
                <FiUser className="icon text-color" />
                <span className="absolute top-0 w-2 h-2 bg-red-500 rounded-full -right-1 animate-pulse"></span>
              </Link>
            )}
            {cartId ? (
              <Link href="/cart" className="relative text-4xl text-color">
                <FiShoppingCart className="icon" />
                <span className="absolute top-0 w-2 h-2 bg-green-500 rounded-full -right-3 animate-pulse"></span>
              </Link>
            ) : (
              <Link href="/cart" className="relative text-4xl text-color">
                <FiShoppingCart className="icon" />
                <span className="absolute top-0 w-2 h-2 bg-red-500 rounded-full -right-3 animate-pulse"></span>
              </Link>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={toggleMenu}
          className="z-50 text-4xl sm:block md:hidden lg:hidden"
        >
          &#9776;
        </button>

        <div
          className={`z-15 fixed top-0 right-0 w-64 h-full bg-[#f5f5f5] shadow-lg border-l border-[#00000033] flex flex-col items-center pt-16 transition-transform transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          <nav className="flex flex-col gap-6 text-lg text-color">
            <Link href="/" onClick={() => setIsOpen(false)}>
              Главная
            </Link>
            <Link href="/catalog" onClick={() => setIsOpen(false)}>
              Каталог
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>
              О нас
            </Link>
            <Link href="#footer" onClick={() => setIsOpen(false)}>
              Контакты
            </Link>
          </nav>
          <div className="flex gap-4 mt-6">
            <Link href="/profile" className="relative text-4xl text-color">
              <FiUser />
              <span
                className={`absolute top-0 w-2 h-2 rounded-full -right-1 animate-pulse ${
                  user ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
            </Link>
            <Link href="/cart" className="relative text-4xl text-color">
              <FiShoppingCart />
              <span
                className={`absolute top-0 w-2 h-2 rounded-full -right-3 animate-pulse ${
                  cartId ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
