"use client";

import { useState } from "react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Image from "next/image";
import { FiMapPin, FiPhone, FiClock } from "react-icons/fi";

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Header />

      <div className="bg-[#f0e6dd]">
        <div className="container py-20 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="font-playfair font-semibold text-5xl title-color mb-6">
              Наши контакты
            </h1>
            <div className="space-y-6">
              <div className="flex items-center">
                <FiMapPin className="text-3xl text-color mr-4 icon" />
                <div>
                  <p className="font-roboto font-semibold text-lg title-color">
                    Адрес шоу-рума:
                  </p>
                  <p className="font-roboto font-normal text-lg text-color">
                    г. Москва, ул. Ткацкая, 15
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <FiPhone className="text-3xl text-color mr-4 icon" />
                <div>
                  <p className="font-roboto font-semibold text-lg title-color">
                    Телефон:
                  </p>
                  <p className="font-roboto font-normal text-lg text-color">
                    +7 999 123 45 67
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <FiClock className="text-3xl text-color mr-4 icon" />
                <div>
                  <p className="font-roboto font-semibold text-lg title-color">
                    Часы работы:
                  </p>
                  <p className="font-roboto font-normal text-lg text-color">
                    Пн-Пт: 10:00 - 20:00
                    <br />
                    Сб-Вс: 11:00 - 18:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="map">
            <Image
              src="/images/map.png"
              alt="Карта"
              width={650}
              height={500}
            />
          </div>
        </div>
      </div>

      <div className="container py-20">
        <div className="w-full mx-auto">
          <h2 className="font-playfair font-semibold text-4xl title-color text-center mb-12">
            Остались вопросы?
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block font-roboto font-normal text-lg text-color mb-2">
                Ваше имя
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-roboto font-normal text-lg text-color mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-roboto font-normal text-lg text-color mb-2">
                Сообщение
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-md h-32"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="main-button font-roboto font-normal text-xl w-full py-4"
            >
              Отправить сообщение
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
