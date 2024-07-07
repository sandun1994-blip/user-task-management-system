"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";

export const register = async (values: any) => {
  
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email,name, password} =
    validateFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email alredy in use!" };
  }

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  
  return { success: "User Created" };
};
