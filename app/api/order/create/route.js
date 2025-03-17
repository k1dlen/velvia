import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  let connection;
  try {
    const { user_id, address, payment_method } = await req.json();

    connection = await db.getConnection();
    await connection.beginTransaction();

    // 1. Получаем корзину
    const [cart] = await connection.query(
      "SELECT id FROM cart WHERE id_user = ?",
      [user_id]
    );

    if (!cart.length) {
      await connection.rollback();
      return NextResponse.json(
        { error: "Корзина не найдена" },
        { status: 404 }
      );
    }

    const cart_id = cart[0].id;

    const [cartItems] = await connection.query(
      `SELECT ci.product_id, ci.count, p.price 
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.cart_id = ?`,
      [cart_id]
    );

    if (cartItems.length === 0) {
      await connection.rollback();
      return NextResponse.json({ error: "Корзина пуста" }, { status: 400 });
    }

    const [order] = await connection.query(
      `INSERT INTO \`order\` 
        (id_user, address, payment_method, id_status)
       VALUES (?, ?, ?, 1)`,
      [user_id, address, payment_method]
    );

    for (const item of cartItems) {
      await connection.query(
        `INSERT INTO order_items 
          (order_id, product_id, count, price)
         VALUES (?, ?, ?, ?)`,
        [order.insertId, item.product_id, item.count, item.price]
      );
    }

    await connection.query("DELETE FROM cart_items WHERE cart_id = ?", [
      cart_id,
    ]);

    await connection.query("DELETE FROM cart WHERE id = ?", [cart_id]);

    await connection.commit();

    return NextResponse.json(
      {
        message: "Заказ успешно создан",
        order_id: order.insertId,
      },
      { status: 200 }
    );
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("Ошибка транзакции:", error);

    return NextResponse.json(
      { error: `Ошибка создания заказа: ${error.message}` },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}
