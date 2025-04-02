import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  // Ici tu vérifies les identifiants avec ta base de données
  console.log("Logging in user:", email, password);

  return NextResponse.json({ message: "Login successful" });
}
