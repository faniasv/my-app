// Sebagai Route Handler untuk endpoint /api/hello
// BE Live 1
// export async function GET() {
//     return Response.json({ message: "Halo dari Backend Next.js!"});
// }

// Implementasi Route Handler untuk endpoint /api/hello
// BE Live 2
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Halo dari Backend Next.js!" });
}

// NextResponse dipakai di sini supaya konsisten dan siap kalau nanti butuh fitur tambahan (cookies, redirect,dll).