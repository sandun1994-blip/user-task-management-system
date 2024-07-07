"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { defaultTaskData } from "@/schemas";
import { useDeleteTask } from "@/services/mutaions";
import { Task } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  selectedtask: Partial<Task>;
  setSelectedTask: Dispatch<SetStateAction<Partial<Task>>>;
}

export function AlertDialogBox({
  open,
  selectedtask,
  setOpen,
  setSelectedTask,
}: Props) {
  const handleReset = () => {
    setOpen((pre) => !pre);
    setSelectedTask(defaultTaskData);
  };

  const { mutate: deleteTask, isPending } = useDeleteTask(handleReset);
  const handleClose = () => {
    setOpen((pre) => !pre);
    setSelectedTask(defaultTaskData);
  };

  const deleteHandle = () => {
    if (selectedtask.id) {
      deleteTask(selectedtask.id);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter >
          <Button size={"sm"} onClick={handleClose} className="mt-3 md:mt-0">
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            size={"sm"}
            onClick={deleteHandle}
            disabled={isPending}
          >
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
