import { z } from "zod";
import { Task } from "@prisma/client";
import { TaskSchema } from "@/schemas";

type FieldErrors<T> = {
    [K in keyof T]?: string[];
  };
  
type ActionState<TInput, TOutput> = {
    fieldErrors?: FieldErrors<TInput>;
    error?: string | null;
    data?: TOutput;
  }

export type InputType= z.infer<typeof TaskSchema>
export type ReturnType= ActionState<InputType,Task>