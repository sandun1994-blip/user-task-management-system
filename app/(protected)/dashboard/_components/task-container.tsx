import { db } from "@/lib/db";
import { TaskList } from "./task-list";
import { Skeleton } from "@/components/ui/skeleton";
import { Task } from "@prisma/client";
import { auth } from "@/auth";




const TaskContainer = async () => {

  const session =await auth()
  const tasks:Task[] = await db.task.findMany({where:{userId:session?.user?.id}, orderBy: {
    createdAt: 'asc',
  },});


  return (
    <div className="px-2 md:px-4">
      <TaskList tasks={tasks} />
    </div>
  );
};

TaskContainer.Loading = function TaskLoading() {
  const array = Array.from({ length: 12 }, (_, i) => i + 1);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {array.map((i) => (
        <Skeleton key={i} className="aspect-video h-full w-full p-2" />
      ))}
    </div>
  );
};

export default TaskContainer;
