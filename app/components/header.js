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

        <div className="items-center gap-3 sm:hidden md:flex lg:flex">
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
          className="text-4xl sm:block md:hidden lg:hidden "
        >
          &#9776;
        </button>

        <div
          className={`${
            isOpen ? "flex" : "hidden"
          }  flex-col items-center justify-center gap-4 font-roboto font-normal text-2xl text-center w-auto p-4 lg:p-0 md:hidden lg:hidden transition-all duration-300 ease-in-out transform`}
        >
          <nav className="flex flex-col gap-4 text-color">
            <Link href="/">Главная</Link>
            <Link href="/catalog">Каталог</Link>
            <Link href="/about">О нас</Link>
            <Link href="/contacts">Контакты</Link>
          </nav>
          <div className="flex flex-col gap-4">
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
      </div>
    </header>
  );
}
