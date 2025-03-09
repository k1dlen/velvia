import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [id]);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Товар не найден" }, { status: 404 });
    }

    const product = rows[0];
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Ошибка базы данных:", error);
    return NextResponse.json({ error: "Ошибка базы данных" }, { status: 500 });
  }
}