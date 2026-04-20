"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getSession, login, logout } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function registerAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  await login({ id: user.id, email: user.email, name: user.name });
  
  redirect("/planner");
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { error: "Invalid email or password" };
  }

  await login({ id: user.id, email: user.email, name: user.name });
  
  redirect("/planner");
}

export async function logoutAction() {
  await logout();
  redirect("/");
}

export async function updateProfileAction(formData: FormData) {
  const session = await getSession();
  if (!session || !session.user) {
    return { error: "Unauthorized" };
  }

  const name = formData.get("name") as string;
  if (!name) {
    return { error: "Name is required" };
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name },
    });
    
    // We might need to refresh the session if name is stored there
    // For now, revalidate path is enough to show updated data in ProfilePage
    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update profile" };
  }
}
