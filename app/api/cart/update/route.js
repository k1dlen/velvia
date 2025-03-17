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

    if (count <= 0) {
      await db.query(
        "DELETE FROM cart_items WHERE cart_id = (SELECT id FROM cart WHERE id_user = ?) AND product_id = ?",
        [user_id, product_id]
      );
    } else {
      await db.query(
        "UPDATE cart_items SET count = ? WHERE cart_id = (SELECT id FROM cart WHERE id_user = ?) AND product_id = ?",
        [count, user_id, product_id]
      );
    }

    const [remainingItems] = await db.query(
      "SELECT COUNT(*) AS count FROM cart_items WHERE cart_id = (SELECT id FROM cart WHERE id_user = ?)",
      [user_id]
    );

    if (remainingItems[0].count == 0) {
      await db.query("DELETE FROM cart WHERE id_user = ?", [user_id]);
    }

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
