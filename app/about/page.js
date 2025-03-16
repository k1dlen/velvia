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
        <div className="container py-20 flex flex-col md:flex-row items-center justify-between min-h-96">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="font-playfair font-semibold text-5xl title-color mb-6">
              О компании Velvia
            </h1>
            <p className="font-roboto font-normal text-2xl text-color">
              С 2010 года мы создаем уникальные оконные решения, которые
              преображают пространство и дарят уют тысячам домов.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-end">
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
        <h2 className="font-playfair font-semibold text-5xl title-color text-center mb-16">
          Наши ценности
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center p-6">
            <FiCheckSquare className="text-6xl accent-color mx-auto mb-6" />
            <h3 className="font-playfair font-semibold text-2xl title-color mb-4">
              Премиальное качество
            </h3>
            <p className="font-roboto font-normal text-lg text-color">
              Используем только сертифицированные материалы и фурнитуру от
              проверенных европейских производителей
            </p>
          </div>

          <div className="text-center p-6">
            <FiGrid className="text-6xl accent-color mx-auto mb-6" />
            <h3 className="font-playfair font-semibold text-2xl title-color mb-4">
              Уникальный дизайн
            </h3>
            <p className="font-roboto font-normal text-lg text-color">
              Собственная дизайн-студия разрабатывает эксклюзивные модели,
              сочетающие тренды и классику
            </p>
          </div>

          <div className="text-center p-6">
            <FiFeather className="text-6xl accent-color mx-auto mb-6" />
            <h3 className="font-playfair font-semibold text-2xl title-color mb-4">
              Экологичность
            </h3>
            <p className="font-roboto font-normal text-lg text-color">
              Все материалы безопасны для детей и домашних животных, имеют
              международные экосертификаты
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#f0e6dd] py-20">
        <div className="container flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <Image
              src="/images/production.png"
              alt="Производство"
              width={650}
              height={500}
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="font-playfair font-semibold text-4xl title-color mb-6">
              Собственное производство
            </h2>
            <p className="font-roboto font-normal text-lg text-color mb-6">
              Мы контролируем весь процесс создания штор - от разработки дизайна
              до финальной сборки. Наше современное оборудование позволяет
              реализовывать даже самые сложные проекты.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="bg-accent-color w-4 h-4 rounded-full mr-3 flex items-center justify-center text-color text-lg">
                  •
                </span>
                <span className="font-roboto font-normal text-lg text-color">
                  Современное немецкое оборудование
                </span>
              </li>
              <li className="flex items-center">
                <span className="bg-accent-color w-4 h-4 rounded-full mr-3 flex items-center justify-center text-color text-lg">
                  •
                </span>
                <span className="font-roboto font-normal text-lg text-color">
                  Опытная команда мастеров
                </span>
              </li>
              <li className="flex items-center">
                <span className="bg-accent-color w-4 h-4 rounded-full mr-3 flex items-center justify-center text-color text-lg">
                  •
                </span>
                <span className="font-roboto font-normal text-lg text-color">
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
