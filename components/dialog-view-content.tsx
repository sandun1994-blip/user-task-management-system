"use client";

import { Priority, Task } from "@prisma/client";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { getStatus } from "@/data/getStatus";
import { Avatar } from "./ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  selectedtask: Partial<Task>;
};
const ViewContent = ({ selectedtask }: Props) => {
  return (
    <DialogContent className="sm:max-w-[425px] md:max-w-[650px]">
      <DialogHeader>
        <DialogTitle>View Task</DialogTitle>

        <DialogDescription className="text-ellipsis text-[11px]">
          {" "}
          Created At :{" "}
          {new Date(selectedtask.createdAt ?? "").toLocaleDateString()}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <DialogDescription>{selectedtask.description}</DialogDescription>
      </div>
      <DialogFooter>
        {selectedtask.status && (
          <Button
            variant="ghost"
            className="h-6 rounded-sm text-[11px] bg-gray-100 cursor-auto"
          >
            {getStatus(selectedtask.status)}
          </Button>
        )}
        {selectedtask.priority && (
          <Avatar
            className={cn(
              "bg-red-500 mr-3 w-6 h-6 text-sm text-center flex items-center justify-center font-semibold text-white",
              selectedtask.priority === Priority.LOW && "bg-green-500",
              selectedtask.priority === Priority.MEDIUM && "bg-yellow-500"
            )}
          >
            {selectedtask.priority[0]}
          </Avatar>
        )}
      </DialogFooter>
    </DialogContent>
  );
};

export default ViewContent;
