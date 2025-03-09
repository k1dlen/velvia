"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/components/header";
import Image from "next/image";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          throw new Error("Не удалось загрузить данные о товаре");
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Header />
        <h1 className="container text-center">Загрузка товара...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <h1 className="container text-center text-red-500">{error}</h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Header />
        <h1 className="container text-center">Товар не найден</h1>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative w-full h-96 md:h-auto  overflow-hidden">
            <Image
              className="w-full h-auto object-cover border-rounded hover:scale-105 transition-transform duration-300 ease-in-out"
              src={product.high_res_image_url}
              alt={product.name}
              width={500}
              height={500}
            />
          </div>

          <div className="space-y-6 font-roboto flex flex-col min-h-full h-screen">
            <h1 className="text-4xl font-bold title-color">{product.name}</h1>
            <p className="text-2xl font-semibold title-color">
              {product.discount ? (
                <>
                  <span className="line-through text-gray-600">
                    ₽ {product.price}
                  </span>{" "}
                  <span className="text-red-600">
                    ₽{" "}
                    {(
                      product.price -
                      (product.price * product.discount) / 100
                    ).toFixed(2)}
                  </span>
                </>
              ) : (
                <span>₽ {product.price}</span>
              )}
            </p>

            <div className="flex items-center space-x-2">
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  product.status === "На складе"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.status}
              </span>
              {product.discount && (
                <span className="px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-full">
                  Скидка {product.discount}%
                </span>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 title-color">
                Описание
              </h2>
              <p className="text-lg text-color">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold title-color">Тип</h3>
                <p className="text-color">{product.type}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold title-color">Размер</h3>
                <p className="text-color">{product.size}</p>
              </div>
            </div>

            {
             (product.status === "На складе") && (
              <button className="main-button font-roboto font-normal text-2xl mt-4 w-full">
                Добавить в корзину
              </button>
            )}

            {
             (product.status === "Распродано") && (
              <button className="disabled main-button font-roboto font-normal text-2xl mt-4 w-full">
                Нет в наличии
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
