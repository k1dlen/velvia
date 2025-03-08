"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

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

        <nav className="nav sm:hidden md:flex lg:flex flex gap-10 font-roboto font-normal text-2xl text-center w-auto p-4 lg:p-0">
          <Link href="/">Главная</Link>
          <Link href="/catalog">Каталог</Link>
          <Link href="/about">О нас</Link>
          <Link href="/contacts">Контакты</Link>
        </nav>

        <div className="sm:hidden md:flex lg:flex items-center gap-3">
          <Link href="/profile">
            <Image
              src="/images/User.svg"
              alt="Профиль"
              width={40}
              height={40}
            />
          </Link>
          <Link href="/cart">
            <Image
              src="/images/Cart.svg"
              alt="Корзина"
              width={40}
              height={40}
            />
          </Link>
        </div>

        <button
          type="button"
          onClick={toggleMenu}
          className="sm:block md:hidden lg:hidden text-4xl "
        >
          &#9776;
        </button>

        <div
          className={`${
            isOpen ? "flex" : "hidden"
          }  flex-col items-center justify-center gap-4 font-roboto font-normal text-2xl text-center w-auto p-4 lg:p-0 md:hidden lg:hidden transition-all duration-300 ease-in-out transform`}
        >
          <nav className="flex flex-col gap-4">
            <Link href="/">Главная</Link>
            <Link href="/catalog">Каталог</Link>
            <Link href="/about">О нас</Link>
            <Link href="/contacts">Контакты</Link>
          </nav>
          <div className="flex flex-col gap-4">
            <Link href="/profile">
              <Image
                src="/images/User.svg"
                alt="Профиль"
                width={40}
                height={40}
              />
            </Link>
            <Link href="/cart">
              <Image
                src="/images/Cart.svg"
                alt="Корзина"
                width={40}
                height={40}
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
