import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const types = url.searchParams.getAll("type");
    const statuses = url.searchParams.getAll("status");
    const minPrice = url.searchParams.get("min_price");
    const maxPrice = url.searchParams.get("max_price");

    let query = "SELECT * FROM products";
    let values = [];

    const conditions = [];

    if (types.length > 0) {
      const placeholders = types.map(() => "?").join(", ");
      conditions.push(`type IN (${placeholders})`);
      values.push(...types);
    }

    if (statuses.length > 0) {
      const placeholders = statuses.map(() => "?").join(", ");
      conditions.push(`status IN (${placeholders})`);
      values.push(...statuses);
    }

    if (minPrice && maxPrice) {
      conditions.push("price BETWEEN ? AND ?");
      values.push(minPrice, maxPrice);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    const [rows] = await db.execute(query, values);

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Ошибка базы данных:", error);
    return NextResponse.json({ error: "Ошибка базы данных" }, { status: 500 });
  }
}
