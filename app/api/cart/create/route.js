import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { id_user } = await req.json();

    const [existingCart] = await db.query(
      "SELECT id FROM cart WHERE id_user = ?",
      [id_user]
    );

    if (existingCart.length > 0) {
      return NextResponse.json(
        { error: "Корзина уже создана" },
        { status: 400 }
      );
    }

    const [result] = await db.query("INSERT INTO cart (id_user) VALUES (?)", [
      id_user,
    ]);

    const cart_id = result.insertId;

    return NextResponse.json({ cart_id }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка при создании корзины" },
      { status: 500 }
    );
  }
}
