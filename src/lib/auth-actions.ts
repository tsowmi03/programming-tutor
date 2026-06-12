"use server";

/**
 * Server actions for signup, login, and logout. These are the only places
 * sessions are created or destroyed, and they always finish with a redirect,
 * so callers only ever see validation errors in the returned state.
 */

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { hashPassword, verifyPassword } from "./password";
import { createSession, destroySession } from "./auth";
import { loginSchema, signupSchema } from "./validation";

export interface AuthFormState {
  error?: string;
  /** Echoed back on failure so React's post-action form reset doesn't wipe
   * what the user typed. Never includes the password. */
  values?: { name?: string; email?: string };
}

function enteredValues(formData: FormData): AuthFormState["values"] {
  const name = formData.get("name");
  const email = formData.get("email");
  return {
    name: typeof name === "string" ? name : undefined,
    email: typeof email === "string" ? email : undefined,
  };
}

/** Only allow same-site paths as post-login destinations. */
function safeNext(formData: FormData): string {
  const next = formData.get("next");
  return typeof next === "string" && next.startsWith("/") && !next.startsWith("//")
    ? next
    : "/";
}

export async function signup(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message, values: enteredValues(formData) };
  }
  const { name, email, password } = parsed.data;

  let userId: string;
  try {
    const user = await prisma.user.create({
      data: { name, email, passwordHash: await hashPassword(password) },
      select: { id: true },
    });
    userId = user.id;
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return {
        error: "An account with that email already exists.",
        values: enteredValues(formData),
      };
    }
    console.error("Signup failed:", err);
    return {
      error: "Something went wrong creating your account.",
      values: enteredValues(formData),
    };
  }

  await createSession(userId);
  revalidatePath("/", "layout");
  redirect(safeNext(formData));
}

export async function login(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message, values: enteredValues(formData) };
  }
  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, passwordHash: true },
  });

  // Hash even when the email is unknown so response timing doesn't reveal
  // which addresses have accounts.
  const valid = user
    ? await verifyPassword(password, user.passwordHash)
    : (await hashPassword(password), false);
  if (!user || !valid) {
    return {
      error: "Invalid email or password.",
      values: enteredValues(formData),
    };
  }

  await createSession(user.id);
  revalidatePath("/", "layout");
  redirect(safeNext(formData));
}

export async function logout(): Promise<void> {
  await destroySession();
  revalidatePath("/", "layout");
  redirect("/login");
}
