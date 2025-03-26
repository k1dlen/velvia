"use client";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cart_id");
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-white transition-all duration-300 ease-in-out transform bg-red-500 rounded hover:bg-red-600"
    >
      Выйти
    </button>
  );
}
