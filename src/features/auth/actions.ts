"use server";

import { db } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "@/lib/session";
import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from "@/validations/auth";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";

export async function loginUser(data: LoginInput) {
  try {
    const validatedData = loginSchema.parse(data);

    const user = await db.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user || !user.passwordHash) {
      return { error: "Invalid email or password" };
    }

    const passwordsMatch = await bcrypt.compare(validatedData.password, user.passwordHash);

    if (!passwordsMatch) {
      return { error: "Invalid email or password" };
    }

    if (user.status === "SUSPENDED") {
      return { error: "Your account has been suspended. Please contact support." };
    }

    await createSession({
      userId: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
    });

    return { success: true };
  } catch (error: any) {
    return { error: "An unexpected error occurred" };
  }
}

export async function registerUser(data: RegisterInput) {
  try {
    const validatedData = registerSchema.parse(data);

    const existingUser = await db.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return { error: "A user with this email already exists" };
    }

    const passwordHash = await bcrypt.hash(validatedData.password, 10);

    const user = await db.user.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        passwordHash,
        status: "ACTIVE", // Auto-activate for now
      },
    });

    await createSession({
      userId: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
    });

    return { success: true };
  } catch (error: any) {
    return { error: "An unexpected error occurred during registration" };
  }
}

export async function logoutUser() {
  await deleteSession();
  redirect("/login");
}
