import "server-only";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import type { UserRole } from "@prisma/client";
import { db } from "@/lib/prisma";
import crypto from "crypto";

const secretKey = process.env.JWT_SECRET_KEY || "fallback_super_secret_key_ps24_local";
const encodedKey = new TextEncoder().encode(secretKey);

export type SessionPayload = {
  userId: string;
  email: string;
  role: UserRole;
  firstName: string;
};

export async function encrypt(payload: SessionPayload, expiresIn = "15m") {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch {
    return null; // Expired or invalid token
  }
}

export async function createSession(payload: SessionPayload) {
  // 1. Create short-lived Access Token (15 mins)
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); 
  const session = await encrypt(payload, "15m");
  
  // 2. Create long-lived Refresh Token (7 days)
  const refreshToken = crypto.randomUUID();
  const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 

  // 3. Save Refresh Token to Database
  await db.user.update({
    where: { id: payload.userId },
    data: { refreshToken },
  });

  const cookieStore = await cookies();

  // 4. Set both cookies
  cookieStore.set("ps24_session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("ps24_refresh", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: refreshExpiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  // updateSession now just relies on getSession which auto-refreshes if needed
  await getSession();
}

export async function deleteSession() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("ps24_refresh")?.value;

  if (refreshToken) {
    try {
      // Find the user with this refresh token and clear it
      const user = await db.user.findFirst({ where: { refreshToken } });
      if (user) {
        await db.user.update({
          where: { id: user.id },
          data: { refreshToken: null },
        });
      }
    } catch (e) {
      console.error("Error clearing refresh token on logout", e);
    }
  }

  cookieStore.delete("ps24_session");
  cookieStore.delete("ps24_refresh");
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("ps24_session")?.value;
  const refreshToken = cookieStore.get("ps24_refresh")?.value;

  // 1. Check if Access Token is valid
  if (session) {
    const payload = await decrypt(session);
    if (payload) {
      return payload; // Token is valid, return payload
    }
  }

  // 2. If Access Token is invalid/missing, check Refresh Token
  if (!refreshToken) {
    return null;
  }

  // 3. Validate Refresh Token against Database
  const user = await db.user.findFirst({
    where: { refreshToken },
  });

  if (!user || user.status === "SUSPENDED") {
    // Refresh token is invalid or user suspended: clear cookies
    cookieStore.delete("ps24_session");
    cookieStore.delete("ps24_refresh");
    return null;
  }

  // 4. Refresh Token is valid! Issue a new Access Token
  const newPayload: SessionPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
  };

  const newAccessToken = await encrypt(newPayload, "15m");
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  cookieStore.set("ps24_session", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  return newPayload;
}
