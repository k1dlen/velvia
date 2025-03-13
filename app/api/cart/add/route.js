import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { cart_id, product_id, count } = await req.json();

    const [existingItem] = await db.query(
      "SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?",
      [cart_id, product_id]
    );

    if (existingItem.length > 0) {
      await db.query(
        "UPDATE cart_items SET count = count + ? WHERE cart_id = ? AND product_id = ?",
        [count, cart_id, product_id]
      );
    } else {
      await db.query(
        "INSERT INTO cart_items (cart_id, product_id, count) VALUES (?, ?, ?)",
        [cart_id, product_id, count]
      );
    }

    return NextResponse.json(
      { message: "Товар добавлен в корзину" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка при добавлении товара в корзину" },
      { status: 500 }
    );
  }
}
