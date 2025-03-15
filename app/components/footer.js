"use client";

import Link from "next/link";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-F0E6DD py-10 border-t border-black/20">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <Link
              href="/"
              className="text-3xl font-playfair font-semibold text-title-color"
            >
              Velvia
            </Link>
            <p className="text-sm font-roboto text-color opacity-70 mt-2 text-center md:text-left">
              Мы создаём уют и стиль с помощью эксклюзивных штор.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-4 text-color font-roboto">
            <Link href="/" className="text-lg">
              Главная
            </Link>
            <Link href="/catalog" className="text-lg">
              Каталог
            </Link>
            <Link href="/about" className="text-lg">
              О нас
            </Link>
            <Link href="/contacts" className="text-lg">
              Контакты
            </Link>
          </div>

          <div className="flex flex-col items-center md:items-start gap-4">
            <p className="text-lg font-semibold text-color">Свяжитесь с нами</p>
            <p className="text-[16px] font-roboto text-color opacity-80">
              +7 999 123 45 67
            </p>
            <p className="text-[16px] font-roboto text-color opacity-80">
              example@email.com
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-color icon"
              >
                <FaTelegram />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-color icon"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-black/20 mt-8"></div>

      <div className="mt-4 text-center text-sm text-color opacity-60">
        <p>2025 © Все права защищены</p>
      </div>
    </footer>
  );
}
