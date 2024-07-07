"use server";

import { auth } from "@/auth";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { TaskSchema } from "@/schemas";

export async function createTask(data: InputType): Promise<ReturnType> {
  const validationResult = TaskSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      error: "Field Error",
    };
  }
  const session = await auth();
  // console.log(session?.user?.id);

  let userId = session?.user?.id;
  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  let task;

  try {
    task = await db.task.create({
      data: { ...validationResult.data, userId },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath("/dashboard");

  return { data: task };
}
