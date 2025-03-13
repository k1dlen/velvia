import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { login, password, full_name, phone, email } = await req.json();

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await db.query(
      "INSERT INTO user (login, password, full_name, phone, email, id_role) VALUES (?, ?, ?, ?, ?, ?)",
      [login, hashedPassword, full_name, phone, email, 1]
    );

    return NextResponse.json(
      { message: "Пользователь зарегистрирован" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка при регистрации" },
      { status: 500 }
    );
  }
}
