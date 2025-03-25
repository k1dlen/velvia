"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Card from "@/app/components/card";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [filterTypes, setFilterTypes] = useState([]);
  const [filterStatus, setFilterStatus] = useState([]);
  const [filterPrice, setFilterPrice] = useState([0, 11000]);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      const queryParams = [];

      if (filterTypes.length) {
        queryParams.push(`type=${filterTypes.join("&type=")}`);
      }

      if (filterStatus.length) {
        queryParams.push(`status=${filterStatus.join("&status=")}`);
      }

      queryParams.push(
        `min_price=${filterPrice[0]}&max_price=${filterPrice[1]}`
      );

      const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";
      const res = await fetch(`/api/products${queryString}`);
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, [filterTypes, filterStatus, filterPrice]);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type) {
      const typesFromUrl = Array.isArray(type) ? type : [type];
      setFilterTypes(typesFromUrl);
    } else {
      setFilterTypes([]);
    }
  }, [searchParams]);

  const productTypes = [
    "Австрийские",
    "Прямые",
    "Лондонские",
    "Фактурные",
    "Римские",
    "Французские",
    "Японские",
    "Скандинавские",
    "Тюль",
    "Вуалевые",
    "Блэкаут",
  ];

  const productStatuses = ["На складе", "Распродано"];

  if (!products || products.length === 0) {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="flex space-x-4 mt-4">
            <div className="relative">
              <button
                className="cursor-pointer px-4 py-2 border rounded-md w-max text-color font-roboto font-normal flex justify-between items-center"
                onClick={() => setIsTypeOpen(!isTypeOpen)}
              >
                <span>Тип</span>
                <span
                  className={`ml-2 transform transition-all duration-300 ease-in-out ${
                    isTypeOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  &#9650;
                </span>
              </button>

              <div
                style={{ backgroundColor: "#F5F5F5" }}
                className={`absolute z-50 left-0 right-0 border rounded-md mt-2 shadow-lg p-4 max-h-60 w-auto min-w-50 overflow-y-auto transition-all duration-300 ease-in-out transform ${
                  isTypeOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                {isTypeOpen && (
                  <div className="space-y-2">
                    {productTypes.map((type) => (
                      <div key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          id={type}
                          value={type}
                          checked={filterTypes.includes(type)}
                          onChange={(e) => {
                            const selected = e.target.checked
                              ? [...filterTypes, type]
                              : filterTypes.filter((item) => item !== type);
                            setFilterTypes(selected);
                          }}
                          className="mr-2"
                        />
                        <label htmlFor={type}>{type}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="relative">
              <button
                className="cursor-pointer px-4 py-2 border rounded-md w-max text-color font-roboto font-normal flex justify-between items-center"
                onClick={() => setIsStatusOpen(!isStatusOpen)}
              >
                <span>Статус</span>
                <span
                  className={`ml-2 transform transition-all duration-300 ease-in-out ${
                    isStatusOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  &#9650;
                </span>
              </button>

              <div
                style={{ backgroundColor: "#F5F5F5" }}
                className={`absolute z-50 left-0 right-0 border rounded-md mt-2 shadow-lg p-4 max-h-60 w-auto min-w-40 overflow-y-auto transition-all duration-300 ease-in-out transform ${
                  isStatusOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                {isStatusOpen && (
                  <div className="space-y-2">
                    {productStatuses.map((status) => (
                      <div key={status} className="flex items-center">
                        <input
                          type="checkbox"
                          id={status}
                          value={status}
                          checked={filterStatus.includes(status)}
                          onChange={(e) => {
                            const selected = e.target.checked
                              ? [...filterStatus, status]
                              : filterStatus.filter((item) => item !== status);
                            setFilterStatus(selected);
                          }}
                          className="mr-2"
                        />
                        <label htmlFor={status}>{status}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="relative">
              <button
                className="cursor-pointer px-4 py-2 border rounded-md w-max text-color font-roboto font-normal flex justify-between items-center"
                onClick={() => setIsPriceOpen(!isPriceOpen)}
              >
                <span>Цена</span>
                <span
                  className={`ml-2 transform transition-all duration-300 ease-in-out ${
                    isPriceOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  &#9650;
                </span>
              </button>

              <div
                style={{ backgroundColor: "#F5F5F5" }}
                className={`absolute z-50 top-full border rounded-md mt-2 shadow-lg p-4 max-h-60 w-auto overflow-y-auto transition-all duration-300 ease-in-out transform ${
                  isPriceOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                {isPriceOpen && (
                  <div className="mt-4">
                    <input
                      type="range"
                      min="0"
                      max="11000"
                      step="100"
                      value={filterPrice[0]}
                      onChange={(e) =>
                        setFilterPrice([+e.target.value, filterPrice[1]])
                      }
                    />
                    <input
                      type="range"
                      min="0"
                      max="11000"
                      step="100"
                      value={filterPrice[1]}
                      onChange={(e) =>
                        setFilterPrice([filterPrice[0], +e.target.value])
                      }
                    />
                    <div>
                      <span>
                        {filterPrice[0]} - {filterPrice[1]}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <h1 className="container text-center">
          Найдено {products.length} товаров
        </h1>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="flex space-x-4 mt-4">
          <div className="relative">
            <button
              className="cursor-pointer px-4 py-2 border rounded-md w-max text-color font-roboto font-normal flex justify-between items-center"
              onClick={() => setIsTypeOpen(!isTypeOpen)}
            >
              <span>Тип</span>
              <span
                className={`ml-2 transform transition-all duration-300 ease-in-out ${
                  isTypeOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                &#9650;
              </span>
            </button>

            <div
              style={{ backgroundColor: "#F5F5F5" }}
              className={`absolute z-50 left-0 right-0 border rounded-md mt-2 shadow-lg p-4 max-h-60 w-auto min-w-50 overflow-y-auto transition-all duration-300 ease-in-out transform ${
                isTypeOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {isTypeOpen && (
                <div className="space-y-2">
                  {productTypes.map((type) => (
                    <div key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        id={type}
                        value={type}
                        checked={filterTypes.includes(type)}
                        onChange={(e) => {
                          const selected = e.target.checked
                            ? [...filterTypes, type]
                            : filterTypes.filter((item) => item !== type);
                          setFilterTypes(selected);
                        }}
                        className="mr-2"
                      />
                      <label htmlFor={type}>{type}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <button
              className="cursor-pointer px-4 py-2 border rounded-md w-max text-color font-roboto font-normal flex justify-between items-center"
              onClick={() => setIsStatusOpen(!isStatusOpen)}
            >
              <span>Статус</span>
              <span
                className={`ml-2 transform transition-all duration-300 ease-in-out ${
                  isStatusOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                &#9650;
              </span>
            </button>

            <div
              style={{ backgroundColor: "#F5F5F5" }}
              className={`absolute z-50 left-0 right-0 border rounded-md mt-2 shadow-lg p-4 max-h-60 w-auto min-w-40 overflow-y-auto transition-all duration-300 ease-in-out transform ${
                isStatusOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {isStatusOpen && (
                <div className="space-y-2">
                  {productStatuses.map((status) => (
                    <div key={status} className="flex items-center">
                      <input
                        type="checkbox"
                        id={status}
                        value={status}
                        checked={filterStatus.includes(status)}
                        onChange={(e) => {
                          const selected = e.target.checked
                            ? [...filterStatus, status]
                            : filterStatus.filter((item) => item !== status);
                          setFilterStatus(selected);
                        }}
                        className="mr-2"
                      />
                      <label htmlFor={status}>{status}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <button
              className="cursor-pointer px-4 py-2 border rounded-md w-max text-color font-roboto font-normal flex justify-between items-center"
              onClick={() => setIsPriceOpen(!isPriceOpen)}
            >
              <span>Цена</span>
              <span
                className={`ml-2 transform transition-all duration-300 ease-in-out ${
                  isPriceOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                &#9650;
              </span>
            </button>

            <div
              style={{ backgroundColor: "#F5F5F5" }}
              className={`absolute z-50 top-full border rounded-md mt-2 shadow-lg p-4 max-h-60 w-auto overflow-y-auto transition-all duration-300 ease-in-out transform ${
                isPriceOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {isPriceOpen && (
                <div className="mt-4">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={filterPrice[0]}
                    onChange={(e) =>
                      setFilterPrice([+e.target.value, filterPrice[1]])
                    }
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={filterPrice[1]}
                    onChange={(e) =>
                      setFilterPrice([filterPrice[0], +e.target.value])
                    }
                  />
                  <div>
                    <span>
                      {filterPrice[0]} - {filterPrice[1]}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 w-full px-0 mx-0 pb-5">
        {products.map((product) => (
          <div key={product.id} className="flex w-full mt-5">
            <Card
              id={product.id}
              name={product.name}
              image_url={product.image_url}
              description={product.description}
              price={product.price}
              discount={product.discount}
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
