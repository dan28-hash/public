"use server";

import { cookies } from "next/headers";
import type { User, AuthSession } from "./types";

const AUTH_COOKIE_NAME = "sy_auth_token";
const USER_COOKIE_NAME = "sy_auth_user";

const ADMIN_EMAIL = "admin@ningbosiyang.com";

export async function loginUser(
  email: string,
  password: string
): Promise<{ success: boolean; message: string; user?: User }> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!email || !password) {
    return { success: false, message: "Email and password are required." };
  }

  const isAdmin = email.toLowerCase() === ADMIN_EMAIL;

  const mockUser: User = {
    _id: isAdmin ? "admin-001" : "user-001",
    email,
    firstName: isAdmin ? "Admin" : "Demo",
    lastName: isAdmin ? "Manager" : "User",
    company: isAdmin ? "Ningbo Siyang" : "Demo Company",
    role: isAdmin ? "admin" : "customer",
  };

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, "mock-jwt-token-" + Date.now(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  cookieStore.set(USER_COOKIE_NAME, JSON.stringify(mockUser), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return { success: true, message: "Login successful.", user: mockUser };
}

export async function registerUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company: string;
}): Promise<{ success: boolean; message: string; user?: User }> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const mockUser: User = {
    _id: "user-" + Date.now(),
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    company: data.company,
    role: "customer",
  };

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, "mock-jwt-token-" + Date.now(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  cookieStore.set(USER_COOKIE_NAME, JSON.stringify(mockUser), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return {
    success: true,
    message: "Registration successful.",
    user: mockUser,
  };
}

export async function getSession(): Promise<AuthSession> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value ?? null;
  const userStr = cookieStore.get(USER_COOKIE_NAME)?.value ?? null;

  let user: User | null = null;
  if (userStr) {
    try {
      user = JSON.parse(userStr);
    } catch {
      user = null;
    }
  }

  return {
    user,
    token,
    isAuthenticated: !!token && !!user,
  };
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  cookieStore.delete(USER_COOKIE_NAME);
}
