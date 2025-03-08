import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    const [products] = await db.query("SELECT * FROM products ORDER BY created_at DESC LIMIT 4");


    return NextResponse.json({products});
}