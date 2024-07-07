"use server";

import { auth } from "@/auth";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { TaskSchema } from "@/schemas";

export async function updateTask(data: InputType): Promise<ReturnType> {
  const validationResult = TaskSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      error: "Field Error",
    };
  }
  const session = await auth();

  let userId = session?.user?.id;
  if (!userId || userId !== validationResult.data.userId) {
    return {
      error: "Unauthorized",
    };
  }

  let task;

  try {
    task = await db.task.update({
      data: { ...validationResult.data, userId },
      where: { id: validationResult.data.id },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update.",
    };
  }

  revalidatePath("/dashboard");

  return { data: task };
}
