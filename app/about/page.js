"use client";

import Image from "next/image";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { FiCheckSquare, FiGrid, FiFeather } from "react-icons/fi";

export default function About() {
  return (
    <div>
      <Header />

      <div className="bg-[#f0e6dd]">
        <div className="container flex flex-col items-center justify-between py-20 md:flex-row min-h-96">
          <div className="mb-10 md:w-1/2 md:mb-0">
            <h1 className="mb-6 text-5xl font-semibold font-playfair title-color">
              О компании Velvia
            </h1>
            <p className="text-2xl font-normal font-roboto text-color">
              С 2010 года мы создаем уникальные оконные решения, которые
              преображают пространство и дарят уют тысячам домов.
            </p>
          </div>
          <div className="flex justify-end md:w-1/2">
            <Image
              src="/images/about_hero.png"
              alt="О компании"
              width={650}
              height={500}
            />
          </div>
        </div>
      </div>

      <div className="container py-20">
        <h2 className="mb-16 text-5xl font-semibold text-center font-playfair title-color">
          Наши ценности
        </h2>
        <div className="grid gap-12 md:grid-cols-3">
          <div className="p-6 text-center">
            <FiCheckSquare className="mx-auto mb-6 text-6xl accent-color" />
            <h3 className="mb-4 text-2xl font-semibold font-playfair title-color">
              Премиальное качество
            </h3>
            <p className="text-lg font-normal font-roboto text-color">
              Используем только сертифицированные материалы и фурнитуру от
              проверенных европейских производителей
            </p>
          </div>

          <div className="p-6 text-center">
            <FiGrid className="mx-auto mb-6 text-6xl accent-color" />
            <h3 className="mb-4 text-2xl font-semibold font-playfair title-color">
              Уникальный дизайн
            </h3>
            <p className="text-lg font-normal font-roboto text-color">
              Собственная дизайн-студия разрабатывает эксклюзивные модели,
              сочетающие тренды и классику
            </p>
          </div>

          <div className="p-6 text-center">
            <FiFeather className="mx-auto mb-6 text-6xl accent-color" />
            <h3 className="mb-4 text-2xl font-semibold font-playfair title-color">
              Экологичность
            </h3>
            <p className="text-lg font-normal font-roboto text-color">
              Все материалы безопасны для детей и домашних животных, имеют
              международные экосертификаты
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#f0e6dd] py-20">
        <div className="container flex flex-col items-center gap-12 md:flex-row">
          <div className="md:w-1/2">
            <Image
              src="/images/production.png"
              alt="Производство"
              width={650}
              height={500}
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="mb-6 text-4xl font-semibold font-playfair title-color">
              Собственное производство
            </h2>
            <p className="mb-6 text-lg font-normal font-roboto text-color">
              Мы контролируем весь процесс создания штор - от разработки дизайна
              до финальной сборки. Наше современное оборудование позволяет
              реализовывать даже самые сложные проекты.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="flex items-center justify-center w-4 h-4 mr-3 text-lg rounded-full bg-accent-color text-color">
                  •
                </span>
                <span className="text-lg font-normal font-roboto text-color">
                  Современное немецкое оборудование
                </span>
              </li>
              <li className="flex items-center">
                <span className="flex items-center justify-center w-4 h-4 mr-3 text-lg rounded-full bg-accent-color text-color">
                  •
                </span>
                <span className="text-lg font-normal font-roboto text-color">
                  Опытная команда мастеров
                </span>
              </li>
              <li className="flex items-center">
                <span className="flex items-center justify-center w-4 h-4 mr-3 text-lg rounded-full bg-accent-color text-color">
                  •
                </span>
                <span className="text-lg font-normal font-roboto text-color">
                  Гарантия 5 лет на все изделия
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
