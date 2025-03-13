import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { user_id, product_id, count } = await req.json();

    const [cart] = await db.query("SELECT id FROM cart WHERE id_user = ?", [
      user_id,
    ]);

    if (!cart.length) {
      return NextResponse.json(
        { error: "Корзина не найдена" },
        { status: 404 }
      );
    }

    const cart_id = cart[0].id; 

    await db.query(
      "UPDATE cart_items SET count = ? WHERE cart_id = ? AND product_id = ?",
      [count, cart_id, product_id]
    );

    return NextResponse.json(
      { message: "Количество товара обновлено" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ошибка при обновлении количества товара:", error);
    return NextResponse.json(
      { error: "Ошибка при обновлении количества товара" },
      { status: 500 }
    );
  }
}
