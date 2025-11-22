import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { requireTenant } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase is not configured" },
        { status: 500 }
      );
    }

    const tenant = await requireTenant("owner");

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const candidateId = formData.get("candidateId") as string | null;

    if (!file || !candidateId) {
      return NextResponse.json(
        { error: "Missing file or candidateId" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const path = `${tenant.tenantId}/${candidateId}/${Date.now()}-${file.name}`;

    const { error } = await supabaseAdmin.storage
      .from("cv-files")
      .upload(path, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      path
    });

  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Upload failed" },
      { status: 500 }
    );
  }
}
