
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateTask(handleReset: () => void) {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (data: Prisma.TaskCreateInput) => {
        return await db.task.create({data});
      },
  
      onSuccess: (res) => {
        
        toast.success(`Task created successfully!`, {
          position: "top-right",
         duration:5000
        });
        handleReset();
      },
      onError: (error, variables, context) => {
        
        toast.error("Error Create Notification !", {
          position: "top-right",
          duration:5000
        });
      },
      onSettled: () => {},
    });
  }