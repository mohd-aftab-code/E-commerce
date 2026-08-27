import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { createSession } from "@/lib/session";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    return NextResponse.redirect(new URL(`/login?error=${error}`, request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=no_code", request.url));
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const redirectUri = `${baseUrl}/api/auth/google/callback`;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/login?error=missing_credentials", request.url));
  }

  try {
    // 1. Exchange code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Token exchange failed", tokenData);
      return NextResponse.redirect(new URL("/login?error=oauth_failed", request.url));
    }

    const { access_token } = tokenData;

    // 2. Fetch user profile from Google
    const profileResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const profileData = await profileResponse.json();

    if (!profileResponse.ok) {
      console.error("Profile fetch failed", profileData);
      return NextResponse.redirect(new URL("/login?error=profile_failed", request.url));
    }

    const { email, given_name, family_name, picture } = profileData;

    if (!email) {
      return NextResponse.redirect(new URL("/login?error=no_email", request.url));
    }

    // 3. Find or Create User in DB
    let user = await db.user.findUnique({
      where: { email },
    });

    if (user) {
      // Update avatar if we log in via Google
      user = await db.user.update({
        where: { id: user.id },
        data: {
          avatarUrl: picture || user.avatarUrl,
          emailVerified: user.emailVerified || new Date(),
        },
      });
    } else {
      // Create new user
      user = await db.user.create({
        data: {
          email,
          firstName: given_name || email.split("@")[0],
          lastName: family_name || "",
          avatarUrl: picture,
          emailVerified: new Date(),
          status: "ACTIVE", // Automatically active since Google verified the email
          role: "CUSTOMER",
          passwordHash: null, // OAuth only
        },
      });
    }

    // 4. Create Session
    await createSession({
      userId: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
    });

    // 5. Redirect to Account Dashboard
    return NextResponse.redirect(new URL("/account", request.url));
  } catch (error) {
    console.error("Google Auth Error:", error);
    return NextResponse.redirect(new URL("/login?error=server_error", request.url));
  }
}
