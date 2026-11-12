import { NextRequest, NextResponse } from "next/server";
import { getDemoProductBySlug } from "@/modules/demo-center/registry";
import { getSandboxState, resetSandboxState, setSandboxState } from "@/lib/forge/store";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const sessionKey = searchParams.get("sessionKey") || "default";

    if (!slug) {
      return NextResponse.json({ error: "slug is required." }, { status: 400 });
    }

    const stored = await getSandboxState(slug, sessionKey);
    if (stored) {
      return NextResponse.json({ success: true, state: stored, source: "sandbox" });
    }

    const product = getDemoProductBySlug(slug);
    return NextResponse.json({
      success: true,
      state: product?.initialData || {},
      source: "seed",
    });
  } catch {
    return NextResponse.json({ error: "Failed to load demo sandbox state." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, sessionKey = "default", state } = body;

    if (!slug || typeof state !== "object" || state === null) {
      return NextResponse.json({ error: "Valid slug and state object required." }, { status: 400 });
    }

    await setSandboxState(slug, state, sessionKey);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to persist demo sandbox state." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const sessionKey = searchParams.get("sessionKey") || "default";

    if (!slug) {
      return NextResponse.json({ error: "slug is required." }, { status: 400 });
    }

    const restored = await resetSandboxState(slug, sessionKey);
    return NextResponse.json({ success: true, state: restored });
  } catch {
    return NextResponse.json({ error: "Failed to restore demo seed data." }, { status: 500 });
  }
}
