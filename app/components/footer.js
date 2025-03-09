"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center text-center">
      <div className="container flex flex-col items-center justify-center pt-4">
        <nav className="flex flex-wrap justify-center gap-10 font-roboto font-normal text-2xl w-full p-4 text-color">
          <Link href="/">Главная</Link>
          <Link href="/catalog">Каталог</Link>
          <Link href="/about">О нас</Link>
          <Link href="/contacts">Контакты</Link>
        </nav>
      </div>
      <div className="mb-4 text-roboto text-2xl text-color">
        2025 © Все права защищены
      </div>
    </footer>
  );
}
