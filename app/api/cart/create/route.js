import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { id_user } = await req.json();

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
