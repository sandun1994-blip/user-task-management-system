import { createTask } from "@/app/actions/task/create-task";
import { deleteTask } from "@/app/actions/task/delete-task";
import { updateTask } from "@/app/actions/task/update-task";
import { db } from "@/lib/db";
import { TaskSchema, TaskSchemaType } from "@/schemas/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type TaskWithId = {
  id: string;
} & TaskSchemaType;

export function useCreateTask(handleReset: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TaskSchemaType) => {
      const task = await createTask(data);
      if (task.error) {
        throw new Error(task.error);
      }
      if (task.fieldErrors?.title) {
        console.log(task.fieldErrors);

        throw new Error(task.fieldErrors?.title.toString());
      }
      if (task.data) {
        return task.data;
      }
    },

    onSuccess: (res) => {
      toast.success(`Task created successfully!`, {
        position: "top-right",
        className: "text-green-500",
        duration: 5000,
      });
      handleReset();
    },
    onError: (error, variables, context) => {
      console.log(error.message, 88);

      toast.error(error.message, {
        position: "top-right",
        duration: 5000,
      });
    },
    onSettled: () => {},
  });
}

export function useUpdateTask(handleReset: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TaskWithId ) => {
      const task = await updateTask(data);
      if (task.error) {
        throw new Error(task.error);
      }
      if (task.fieldErrors?.title) {
        console.log(task.fieldErrors);

        throw new Error(task.fieldErrors?.title.toString());
      }
      if (task.data) {
        return task.data;
      }
    },

    onSuccess: (res) => {
      toast.success(`Task updated successfully!`, {
        position: "top-right",
        className: "text-green-500",
        duration: 5000,
      });
      handleReset();
    },
    onError: (error, variables, context) => {
      console.log(error.message, 88);

      toast.error(error.message, {
        position: "top-right",
        duration: 5000,
      });
    },
    onSettled: () => {},
  });
}

export function useDeleteTask(handleReset: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: string ) => {
      const task = await deleteTask(data);
      if (task.error) {
        throw new Error(task.error);
      }
      if (task.data) {
        return task.data;
      }
    },

    onSuccess: (res) => {
      toast.success(`Task deleted successfully!`, {
        position: "top-right",
        className: "text-green-500",
        duration: 5000,
      });
      handleReset();
    },
    onError: (error, variables, context) => {
      console.log(error.message, 88);

      toast.error(error.message, {
        position: "top-right",
        duration: 5000,
      });
    },
    onSettled: () => {},
  });
}
