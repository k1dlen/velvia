import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const user_id = url.searchParams.get("user_id");
    const [user] = await db.query("SELECT id_role FROM user WHERE id = ?", [
      user_id,
    ]);

    let query = `
    SELECT 
      o.id AS order_id,
      DATE_FORMAT(o.created_at, '%d-%m-%Y') AS order_date,
      os.name AS order_status,
      SUM(oi.count * oi.price) AS total_amount,
      o.payment_method,
      o.address,
      o.id_status,
      u.full_name,
      u.phone
    FROM \`order\` o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN order_status os ON o.id_status = os.id
    JOIN \`user\` u ON o.id_user = u.id
  `;

    const params = [];

    if (user.id_role === 1) {
      query += " WHERE o.id_user = ?";
      params.push(user_id);
    }

    query += " GROUP BY o.id ORDER BY o.created_at DESC";

    const [orders] = await db.query(query, params);

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Ошибка при получении заказов" },
      { status: 500 }
    );
  }
}
