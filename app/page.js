"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "./components/header";
import Card from "./components/card";
import Link from "next/link";

export default function Home() {
  const [Latestproducts, setLatestProducts] = useState([]);

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
        <div className="container flex flex-col justify-center items-start min-h-125">
          <div className="main_body">
            <h1 className="font-playfair font-semibold text-5xl title-color">
              Открой для себя мир штор:
              <br />
              стиль и уют в каждом доме!
            </h1>
            <p className="font-roboto font-normal text-2xl text-color mt-4">
              8 видов систем, более 1000 видов тканей, и множество <br />
              дополнительных возможностей позволяют создать
              <br />
              уникальную и уютную атмосферу в вашем доме.
            </p>
            <button className="main-button font-roboto font-normal text-2xl mt-4">
              <Link href="/catalog">Каталог</Link>
            </button>
          </div>
        </div>
      </div>

      <div className="container latestProducts">
        <h2 className="font-playfair font-semibold text-5xl mt-10 text-center">
          Новинки
        </h2>
        <div className="container grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 w-full px-0 mx-0">
          {Latestproducts.map((product) => (
            <div key={product.id} className="flex w-full mt-5">
              <Card
                id={product.id}
                key={product.id}
                name={product.name}
                image_url={product.image_url}
                description={product.description}
                price={product.price}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="welcome mt-10">
        <div className="container flex justify-between items-center min-h-150">
          <div className="flex flex-col justify-center items-start w-1/2">
            <h2 className="font-playfair font-semibold text-5xl mt-10 title-color">
              Добро пожаловать в Velvia
            </h2>
            <p className="font-playfair font-normal text-4xl mt-4 title-color">
              Место, где рождается уют и стиль.
            </p>
            <p className="font-roboto font-normal text-2xl mt-4 text-color">
              Наша миссия — предоставить вам доступ к самым
              <br />
              изысканным и уникальным шторам.
            </p>
            <p className="font-roboto font-normal text-2xl mt-4 text-color">
              Мы хотим, чтобы каждый клиент — будь то ценитель
              <br />
              уюта, дизайнер интерьеров или просто любитель
              <br />
              красоты — получил персонализированный опыт
              <br />
              создания идеального пространства.
            </p>
          </div>
          <div className="w-1/2 flex justify-end mt-10">
            <Image
              src="/images/welcome_photo.png"
              alt="Логотип"
              width={650}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
