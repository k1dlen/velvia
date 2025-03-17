import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { user_id, product_id } = await req.json();

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
      "DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?",
      [cart_id, product_id]
    );

    const [remainingItems] = await db.query(
      "SELECT COUNT(*) AS count FROM cart_items WHERE cart_id = ?",
      [cart[0].id]
    );

    let cartDeleted = false;

    console.log("Remaining items count:", remainingItems[0].count);
    console.log("Remaining items:", remainingItems);

    if (remainingItems[0].count == 0) {
      await db.query("DELETE FROM cart WHERE id_user = ?", [user_id]);
      cartDeleted = true;
    }

    return NextResponse.json(
      {
        message: "Товар и корзина удалены",
        cartDeleted: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка при удалении товара из корзины" },
      { status: 500 }
    );
  }
}
