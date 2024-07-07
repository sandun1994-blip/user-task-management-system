"use server";

import { auth } from "@/auth";
import { ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteTask(id: string): Promise<ReturnType> {
  if (!id) {
    return {
      error: "Can not find task ID",
    };
  }

  const session = await auth();

  let userId = session?.user?.id;
  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  let task;

  try {
    task = await db.task.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete.",
    };
  }

  revalidatePath("/dashboard");

  return { data: task };
}
