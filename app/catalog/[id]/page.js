"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cartItem, setCartItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const router = useRouter();

  const fetchCart = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const user = JSON.parse(storedUser);
      const response = await fetch("/api/cart/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user.id }),
      });


      const data = await response.json();
      const item = data.cartItems.find(
        (item) => item.product_id === parseInt(id)
      );
      setCartItem(item || null);
    } catch (error) {
      console.error(error);
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Не удалось загрузить данные о товаре");
        const data = await res.json();
        setProduct(data);
        await fetchCart();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const confirmDelete = async () => {
    try {
      if (productToDelete) {
        const storedUser = localStorage.getItem("user");
        const user = JSON.parse(storedUser);

        const response = await fetch("/api/cart/remove", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            product_id: productToDelete.id,
          }),
        });

        if (response.ok) {
          setCartItem(null);
          toast.success("Товар удален из корзины");
        } else {
          toast.error("Не удалось удалить товар из корзины");
        }
      }
    } catch (error) {
      console.error("Ошибка:", error);
      toast.error("Ошибка при удалении товара");
    } finally {
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  const updateCount = async (newCount) => {
    try {
      if (newCount <= 0) {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
        return;
      }

      const storedUser = localStorage.getItem("user");
      const user = JSON.parse(storedUser);

      const response = await fetch("/api/cart/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          product_id: product.id,
          count: newCount,
        }),
      });

      if (response.ok) await fetchCart();
      toast.success("Количество товара обновлено");
    } catch (error) {
      console.error("Ошибка:", error);
      toast.error("Ошибка при обновлении количества");
    }
  };

  const addToCart = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        toast.warning("Пожалуйста, авторизуйтесь");
        router.push("/profile");
        return;
      }

      const user = JSON.parse(storedUser);
      let cartId = localStorage.getItem("cart_id");

      if (!cartId) {
        const createResponse = await fetch("/api/cart/create", {
          method: "POST",
          body: JSON.stringify({ id_user: user.id }),
        });
        const { cart_id } = await createResponse.json();
        cartId = cart_id;
        localStorage.setItem("cart_id", cart_id);
      }

      await fetch("/api/cart/add", {
        method: "POST",
        body: JSON.stringify({
          cart_id: cartId,
          product_id: product.id,
          count: 1,
        }),
      });

      await fetchCart();
      toast.success("Товар добавлен в корзину");
    } catch (error) {
      console.error("Ошибка:", error);
      toast.error("Ошибка при добавлении товара");
    }
  };

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

            {product.status === "На складе" &&
              (!cartLoading ? (
                cartItem ? (
                  <div className="flex items-center gap-4 mt-4">
                    <button
                      onClick={() => updateCount(cartItem.count - 1)}
                      className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 
              transition-all ease-in-out duration-300  font-roboto font-normal
              w-12 flex-shrink-0 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="font-roboto font-normal text-color text-xl">
                      {cartItem.count}
                    </span>
                    <button
                      onClick={() => updateCount(cartItem.count + 1)}
                      className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 
              transition-all ease-in-out duration-300 font-roboto font-normal
              w-12 flex-shrink-0 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={addToCart}
                    className="main-button font-roboto font-normal text-2xl mt-4 w-full"
                  >
                    Добавить в корзину
                  </button>
                )
              ) : (
                <p className="text-center mt-4">Проверка корзины...</p>
              ))}
          </div>
        </div>
      </div>
      <Footer />

      {isDeleteModalOpen && (
        <div className="absolute inset-0 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold title-color mb-4">
              Удалить товар из корзины?
            </h2>
            <div className="flex justify-end space-x-4 w-full">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border rounded-md cancel-button font-roboto font-normal"
              >
                Отмена
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 border rounded-md main-button font-roboto font-normal"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
