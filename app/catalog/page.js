"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/app/components/header";
import Card from "@/app/components/card";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (router.query && router.query.type) {
      const { type } = router.query;
      setFilterType(type);
    } else {
      setFilterType(""); 
    }
  }, [router.query]);

  useEffect(() => {
    if (filterType) {
      setFilteredProducts(
        products.filter((product) => product.type === filterType)
      );
    } else {
      setFilteredProducts(products);
    }
  }, [filterType, products]);

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

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

  return (
    <>
      <Header />

      <div className="container">
        <div className="mb-6 mt-4">
          <select
            id="product-type"
            value={filterType}
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded-md w-full sm:w-60"
          >
            <option value="" disabled>
              Выберите тип штор
            </option>
            {productTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="container grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 w-full px-0 mx-0">
        {filteredProducts.map((product) => (
          <div key={product.id} className="flex w-full mt-5">
            <Card
              id={product.id}
              name={product.name}
              image_url={product.image_url}
              description={product.description}
              price={product.price}
            />
          </div>
        ))}
      </div>
    </>
  );
}
