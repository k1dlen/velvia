"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Card from "@/app/components/card";
import CollectionCard from "@/app/components/collectionCard";
import Link from "next/link";

export default function Home() {
  const [Latestproducts, setLatestProducts] = useState([]);

  const collections = [
    { id: 1, name: "Австрийские", image_url: "/images/austrian.png" },
    { id: 2, name: "Лондонские", image_url: "/images/london.png" },
    { id: 3, name: "Прямые", image_url: "/images/straight.png" },
    { id: 4, name: "Фактурные", image_url: "/images/textured.png" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products/latest");
      const data = await res.json();
      setLatestProducts(data.products);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Header />
      <div className="main">
        <div className="container flex flex-col items-start justify-center min-h-125">
          <div className="main_body">
            <h1 className="text-5xl font-semibold font-playfair title-color">
              Открой для себя мир штор:
              <br />
              стиль и уют в каждом доме!
            </h1>
            <p className="mt-4 text-2xl font-normal font-roboto text-color">
              8 видов систем, более 1000 видов тканей, и множество <br />
              дополнительных возможностей позволяют создать
              <br />
              уникальную и уютную атмосферу в вашем доме.
            </p>
            <div className="mt-4">
              <Link
                href="/catalog"
                className="text-2xl font-normal main-button font-roboto"
              >
                Каталог
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container latestProducts">
        <h2 className="mt-10 text-4xl font-semibold text-center md:text-5xl font-playfair title-color">
          Новинки
        </h2>
        <div className="container grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 w-full px-0 mx-0">
          {Latestproducts.map((product) => (
            <div key={product.id} className="flex w-full mt-5">
              <Card
                id={product.id}
                key={product.id}
                name={product.name}
                image_url={product.image_url}
                description={product.description}
                price={product.price}
                discount={product.discount}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 welcome">
        <div className="container flex flex-col-reverse items-center justify-between py-5 lg:flex-row min-h-175">
          <div className="flex flex-col items-center justify-center w-full text-center lg:items-start lg:w-1/2 lg:text-left">
            <h2 className="mt-10 text-4xl font-semibold md:text-5xl font-playfair title-color">
              Добро пожаловать в Velvia
            </h2>
            <p className="mt-4 text-xl font-normal md:text-4xl font-playfair title-color">
              Место,&nbsp;где рождается уют&nbsp;и&nbsp;стиль.
            </p>
            <p className="mt-4 text-lg font-normal md:text-2xl font-roboto text-color">
              Наша миссия — предоставить вам доступ к самым
              изысканным&nbsp;и&nbsp;уникальным шторам.
            </p>
            <p className="mt-4 text-lg font-normal md:text-2xl font-roboto text-color">
              Мы хотим, чтобы каждый клиент&nbsp;—&nbsp;будь то ценитель
              уюта,&nbsp;дизайнер интерьеров или просто любитель
              красоты&nbsp;—&nbsp;получил персонализированный опыт создания
              идеального пространства.
            </p>
          </div>
          <div className="flex justify-center w-full mt-6 lg:justify-end lg:w-1/2 lg:mt-10">
            <Image
              src="/images/welcome_photo.png"
              alt="Добро пожаловать в Velvia"
              width={650}
              height={500}
              className="lg:w-full sm:w-90%"
            />
          </div>
        </div>
      </div>

      <div className="container mt-10 CurtainCollection">
        <h2 className="mt-10 text-4xl font-semibold text-center md:text-5xl font-playfair title-color">
          Исследуйте наши коллекции штор
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 w-full px-0 mx-0">
          {collections.map((collection) => (
            <div key={collection.id} className="flex w-full mt-5">
              <CollectionCard
                id={collection.id}
                key={collection.id}
                name={collection.name}
                image_url={collection.image_url}
                type={collection.type}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 request">
        <div className="container flex flex-col items-center justify-center min-h-90">
          <h2 className="text-4xl font-semibold text-center md:text-5xl font-playfair title-color">
            Не знаете, какие шторы подойдут вашему интерьеру?
          </h2>
          <p className="text-lg text-center md:text-2xl mdfont-normal font-roboto mt-7 text-color">
            Свяжитесь с нами, и мы поможем подобрать идеальные шторы для вашего
            дома!
          </p>
          <div className="mt-7">
            <a
              href="#footer"
              className="text-lg font-normal md:text-2xl main-button font-roboto"
            >
              Посмотреть контакты
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
