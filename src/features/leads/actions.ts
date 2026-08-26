"use server";

import { db } from "@/lib/prisma";
import { sendEmail } from "@/lib/mail";
import { leadCaptureSchema, LeadCaptureInput } from "./validations";

export async function captureExitIntentLead(data: LeadCaptureInput) {
  try {
    const parsed = leadCaptureSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: "Invalid email" };
    }

    const { email, source } = parsed.data;

    // Save lead to database
    await db.lead.create({
      data: {
        name: "Anonymous",
        email,
        message: `Captured via ${source}`,
        status: "NEW",
      },
    });

    // Send discount email
    await sendEmail({
      to: email,
      subject: "Here's your 10% Off Discount! 🎉",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thanks for checking out Print Studio 24!</h2>
          <p>We noticed you were about to leave. Come back and finish your project with a 10% discount on your first order.</p>
          <p>Use code: <strong>PRINT10</strong> at checkout.</p>
          <br/>
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Return to Store</a>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Lead capture failed:", error);
    return { success: false, error: "Failed to save lead" };
  }
}


