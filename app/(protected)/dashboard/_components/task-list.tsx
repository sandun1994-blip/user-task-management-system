"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiAddLargeLine } from "react-icons/ri";
import TaskForm from "./task-form";

export const TaskList = () => {
  const [task, selectedTask] = useState({ action: "add", taskData: {} });
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const editHandle = (tag: string) => {
    if (tag) {
      router.push("?tag=" + tag);
    }
  };

  useEffect(() => {
    console.log("ok");
  }, [params]);

  return (
    <>{open && <TaskForm setOpen={setOpen} open={open} selectedTask={selectedTask} task={task}/>}
    <div className="space-y-4">
      <Button
        variant="outline"
        onClick={() => {
          setOpen(true);
        }}
      >
        {" "}
        <RiAddLargeLine className="w-4 h-4 mr-2 " /> Add Task
      </Button>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          role="button"
          className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 
          items-center justify-center hover:opacity-75 transition"
        >
          <p className="text-sm">Create new board</p>
          <span className="text-xs">5 remaining</span>
          <button onClick={() => editHandle("edit")}>edit</button>
        </div>

        <div
          role="button"
          className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 
          items-center justify-center hover:opacity-75 transition"
        >
          <p className="text-sm">Create new board</p>
          <span className="text-xs">5 remaining</span>
        </div>
      </div>
    </div>
    </>
  );
};

TaskList.Loading= function TaskLoading() {
  const array = Array.from({ length: 12 }, (_, i) => i + 1);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {array.map((i) => (
        <Skeleton key={i} className="aspect-video h-full w-full p-2" />
      ))}
    </div>
  );
}
