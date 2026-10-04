// BE Live 4 Middleware
// Latihan 1. Logger
import { NextResponse } from "next/server";

export function middleware(request) {
  const waktu = new Date().toISOString();
  console.log(`[${waktu}] ${request.method} ${request.nextUrl.pathname}`);

  return NextResponse.next(); // lanjutkan request seperti biasa
}

export const config = {
  matcher: ["/api/:path*"], // middleware ini cuma jalan untuk request ke /api/...
};


// -------------------------------------------------------------------------------------//
// Latihan 2. Proteksi halaman /favorites
// import { NextResponse } from "next/server";

// export function middleware(request) {
//   const token = request.cookies.get("token");

//   if (!token) {
//     // belum ada tanda login -> lempar ke halaman lain
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/favorites"], // ganti sesuai halaman yang mau dilindungi
// };

// -------------------------------------------------------------------------------------//
// Latihan 3. Maintenance Mode
// import { NextResponse } from "next/server";

// export function middleware(request) {
//   const isMaintenance = process.env.MAINTENANCE_MODE === "true";
//   const isMaintenancePage = request.nextUrl.pathname === "/maintenance";

//   if (isMaintenance && !isMaintenancePage) {
//     return NextResponse.redirect(new URL("/maintenance", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next|favicon.ico).*)"], // semua path, kecuali file internal Next.js
// };