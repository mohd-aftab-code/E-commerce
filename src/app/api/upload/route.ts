import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = formData.get("folder") as string || "general";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and add timestamp to prevent overwriting
    const originalName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
    const timestamp = Date.now();
    const filename = `${timestamp}-${originalName}`;

    // Define upload directory: public/uploads/[folder]
    const uploadDir = join(process.cwd(), "public", "uploads", folder);

    // Create directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Write file to disk
    const filePath = join(uploadDir, filename);
    await writeFile(filePath, buffer);

    // Return the public URL
    const fileUrl = `/uploads/${folder}/${filename}`;

    return NextResponse.json({ url: fileUrl, success: true });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
