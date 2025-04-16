import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const backendUrl = process.env.LARAVEL_API_URL;

  const res = await fetch(`${backendUrl}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    return NextResponse.json({ message: "Registration failed" }, { status: 400 });
  }

  const data = await res.json();
  cookies().set("token", data.token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return NextResponse.json({ message: "Registration successful" });
}