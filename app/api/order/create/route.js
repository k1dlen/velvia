import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { user_id, address, payment_method } = await req.json();

    const [cart] = await db.query("SELECT id FROM cart WHERE id_user = ?", [
      user_id,
    ]);
    if (!cart.length)
      return NextResponse.json(
        { error: "Корзина не найдена" },
        { status: 404 }
      );

    const cart_id = cart[0].id;
    const [cartItems] = await db.query(
      "SELECT ci.*, p.price FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.cart_id = ?",
      [cart_id]
    );
    console.log("Received cartItems:", cartItems);
    

    const [order] = await db.query(
      "INSERT INTO `order` (id_user, address, payment_method, id_status) VALUES (?, ?, ?, 1)",
      [user_id, address, payment_method]
    );

    for (const item of cartItems) {
      await db.query(
        "INSERT INTO order_items (order_id, product_id, count, price) VALUES (?, ?, ?, ?)",
        [order.insertId, item.product_id, item.count, item.price]
      );
    }

    await db.query("DELETE FROM cart_items WHERE cart_id = ?", [cart_id]);

    return NextResponse.json(
      { message: "Заказ успешно создан" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка при создании заказа" },
      { status: 500 }
    );
  }
}
