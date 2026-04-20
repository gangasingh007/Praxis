import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = "secret"; // Fallback for safety, but should be in .env
const key = new TextEncoder().encode(process.env.JWT_SECRET || secretKey);

export const AUTH_COOKIE_NAME = "praxis_auth_token";

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(user: { id: string; email: string; name?: string | null }) {
  // Create the session
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  (await cookies()).set(AUTH_COOKIE_NAME, session, { 
    expires, 
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/"
  });
}

export async function logout() {
  // Destroy the session
  (await cookies()).set(AUTH_COOKIE_NAME, "", { expires: new Date(0) });
}

export async function getSession() {
  const session = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
  if (!session) return null;
  try {
    return await decrypt(session);
  } catch (e) {
    return null;
  }
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/"
  });
  return res;
}
