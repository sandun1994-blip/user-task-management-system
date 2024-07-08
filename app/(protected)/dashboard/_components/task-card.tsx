"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Priority, Status, Task } from "@prisma/client";
import { GrView } from "react-icons/gr";
import { HiDotsVertical } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { cn } from "@/lib/utils";
import { getStatus } from "@/data/getStatus";
import { Dispatch, SetStateAction } from "react";
import { Action } from "@/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type Props = {
  task: Task;
  setSelectedTask: Dispatch<SetStateAction<Partial<Task>>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setMethod: Dispatch<SetStateAction<Action>>;
  setOpenDelete: Dispatch<SetStateAction<boolean>>;
};
const TaskCard = ({
  task,
  setSelectedTask,
  setOpen,
  setMethod,
  setOpenDelete,
}: Props) => {
  const editHandle = () => {
    setMethod(Action.EDIT);
    setSelectedTask(task);
    setOpen((pre) => !pre);
  };
  const viewHandle = () => {
    setMethod(Action.VIEW);
    setSelectedTask(task);
    setOpen((pre) => !pre);
  };

  const deleteHandle = () => {
    setSelectedTask(task);
    setOpenDelete((pre) => !pre);
  };
  return (
    <Card className="">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="capitalize">{task.title} </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0"
              >
                <HiDotsVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer flex items-center justify-around "
                  onClick={viewHandle}
                >
                  <GrView className="mr-3 h-4 w-4 flex-1" />
                  <span className="text-[12px] text-start flex-1">View</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer flex items-center justify-around "
                  onClick={editHandle}
                >
                  <FaEdit className="mr-3 h-4 w-4 flex-1" />
                  <span className="text-[12px] flex-1">Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer flex items-center justify-around "
                  onClick={deleteHandle}
                >
                  <MdDeleteForever className="mr-3 h-4 w-4 flex-1" />
                  <span className="text-[12px] flex-1">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <CardDescription className="text-ellipsis text-[11px]">
          {" "}
          Created At : {new Date(task.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between ">
        <Button
          variant="ghost"
          className={cn(
            "h-6 rounded-sm text-[11px] bg-red-100 cursor-auto",
            task.status === Status.DONE && "bg-green-100",
            task.status === Status.IN_PROGRESS && "bg-yellow-100"
          )}
        >
          {getStatus(task.status)}
        </Button>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Avatar
              className={cn(
                "bg-red-500 cursor-pointer  w-6 h-6 text-sm text-center flex items-center justify-center font-semibold text-white mr-3",
                task.priority === Priority.LOW && "bg-green-500",
                task.priority === Priority.MEDIUM && "bg-yellow-500"
              )}
            >
              
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent className="w-30 ">
            <div className="text-[12px] text-gray-500 uppercase">
            Priority :  {task.priority}
            </div>
          </HoverCardContent>
        </HoverCard>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
