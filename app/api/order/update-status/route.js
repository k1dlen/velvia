import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { order_id, new_status } = await req.json();

    const [result] = await db.query(
      "UPDATE `order` SET id_status = ? WHERE id = ?",
      [new_status, order_id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Заказ не найден" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Статус заказа успешно обновлен" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ошибка при обновлении статуса:", error);
    return NextResponse.json(
      { error: "Ошибка при обновлении статуса" },
      { status: 500 }
    );
  }
}
