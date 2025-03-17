import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { user_id } = await req.json();

    if (!user_id) {
      return NextResponse.json(
        { error: "Пользователь не найден" },
        { status: 404 }
      );
    }

    const [cart] = await db.query("SELECT id FROM cart WHERE id_user = ?", [
      user_id,
    ]);

    console.log("Received cart:", cart);

    if (!cart) {
      return NextResponse.json(
        { error: "Корзина не найдена" },
        { status: 404 }
      );
    }

    const [cartItems] = await db.query(
      "SELECT ci.*, p.name, p.price, p.discount, p.image_url " +
        "FROM cart_items ci " +
        "JOIN products p ON ci.product_id = p.id " +
        "WHERE ci.cart_id = ?",
      [cart[0].id]
    );

    console.log("Received cartItems:", cartItems);

    return NextResponse.json({ cartItems }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка при получении корзины" },
      { status: 500 }
    );
  }
}
