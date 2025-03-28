"use client";

import Link from "next/link";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="footer" className="py-10 border-t bg-F0E6DD border-black/20">
      <div className="container">
        <div className="flex flex-col items-center justify-between mb-8 md:flex-row md:items-start">
          <div className="flex flex-col items-center mb-6 md:items-start md:mb-0">
            <Link
              href="/"
              className="text-3xl font-semibold font-playfair text-title-color"
            >
              Velvia
            </Link>
            <p className="mt-2 text-sm text-center font-roboto text-color opacity-70 md:text-left">
              Мы создаём уют и стиль с помощью эксклюзивных штор.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 md:items-start text-color font-roboto">
            <Link
              href="/"
              className="text-lg hover:text-[#8b7355] transition-all duration-300 ease-in-out"
            >
              Главная
            </Link>
            <Link
              href="/catalog"
              className="text-lg hover:text-[#8b7355] transition-all duration-300 ease-in-out"
            >
              Каталог
            </Link>
            <Link
              href="/about"
              className="text-lg hover:text-[#8b7355] transition-all duration-300 ease-in-out"
            >
              О нас
            </Link>
          </div>

          <div className="flex flex-col items-center gap-4 md:items-start">
            <p className="text-lg font-semibold text-color">Свяжитесь с нами</p>
            <p className="text-[16px] font-roboto text-color opacity-80">
              <a href="tel:+7(916)-977-89-98">+7(916)-977-89-98</a>
            </p>
            <p className="text-[16px] font-roboto text-color opacity-80">
              <a href="mailto:Velvia@email.com">Velvia@email.com</a>
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

      <div className="w-full mt-8 border-t border-black/20"></div>

      <div className="mt-4 text-sm text-center text-color opacity-60">
        <p>2025 © Все права защищены</p>
      </div>
    </footer>
  );
}
