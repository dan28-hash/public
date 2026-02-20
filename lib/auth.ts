"use server";

import { cookies } from "next/headers";
import type { User, AuthSession } from "./types";

const AUTH_COOKIE_NAME = "sy_auth_token";
const USER_COOKIE_NAME = "sy_auth_user";

/**
 * Auth Utilities
 *
 * Currently uses mock authentication with cookies.
 * When connecting to Unchained Commerce, replace with:
 * - loginWithPassword mutation for login
 * - createUser mutation for registration
 * - JWT token handling from Unchained response
 */

export async function loginUser(
  email: string,
  password: string
): Promise<{ success: boolean; message: string; user?: User }> {
  // TODO: Replace with Unchained GraphQL mutation:
  // mutation LoginWithPassword($email: String!, $plainPassword: String!) {
  //   loginWithPassword(email: $email, plainPassword: $plainPassword) {
  //     id token tokenExpires user { _id username emails { address } }
  //   }
  // }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock validation
  if (!email || !password) {
    return { success: false, message: "Email and password are required." };
  }

  // Mock user
  const mockUser: User = {
    _id: "user-001",
    email,
    firstName: "Demo",
    lastName: "User",
    company: "Demo Company",
  };

  // Set cookies
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, "mock-jwt-token-" + Date.now(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
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
  // TODO: Replace with Unchained GraphQL mutation:
  // mutation CreateUser($email: String!, $plainPassword: String!, $profile: UserProfileInput) {
  //   createUser(email: $email, plainPassword: $plainPassword, profile: $profile) {
  //     id token user { _id }
  //   }
  // }

  await new Promise((resolve) => setTimeout(resolve, 800));

  const mockUser: User = {
    _id: "user-" + Date.now(),
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    company: data.company,
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
