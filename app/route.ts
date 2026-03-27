import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(request: Request) {
  let html: string;
  try {
    // Try filesystem first (works locally and may work on some platforms)
    html = await readFile(
      join(process.cwd(), "public", "app.html"),
      "utf-8"
    );
  } catch {
    // Fallback: fetch from public URL (needed for Vercel serverless)
    const url = new URL("/app.html", request.url);
    const res = await fetch(url);
    html = await res.text();
  }
  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
