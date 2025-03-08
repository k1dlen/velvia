import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    const [products] = await db.query("SELECT * FROM products");


    return NextResponse.json({products});
}