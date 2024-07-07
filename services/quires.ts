import { db } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      try {
        const tasks = await db.task.findMany();
        //  console.log(tasks,'get');

        return tasks;
      } catch (error) {
        throw new Error("Failed to fetch tasks");
      }
    },
  });
}
