"use client";

import ViewContent from "@/components/dialog-view-content";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { defaultTaskData, TaskSchema } from "@/schemas";
import { useCreateTask, useUpdateTask } from "@/services/mutaions";
import { Action } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Priority, Status, Task } from "@prisma/client";
import { SelectValue } from "@radix-ui/react-select";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  selectedtask: Partial<Task>;
  setSelectedTask: Dispatch<SetStateAction<Partial<Task>>>;
  method: Action;
}
const TaskForm = ({
  setOpen,
  open,
  setSelectedTask,
  selectedtask,
  method,
}: Props) => {
  const handleReset = () => {
    setOpen((pre) => !pre);
    setSelectedTask(defaultTaskData);
  };
  const { mutate: createTask, isPending } = useCreateTask(handleReset);

  const { mutate: updateTask, isPending: isPendingTwo } =
    useUpdateTask(handleReset);

  const defaultFormData = useMemo(() => {
    if (selectedtask.id) {
      return {
        title: selectedtask.title,
        status: selectedtask.status,
        priority: selectedtask.priority,
        userId: selectedtask.userId,
        description: selectedtask.description as string,
      };
    }

    return defaultTaskData;
  }, [selectedtask]);

  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: defaultFormData,
  });

  const onSubmit = (values: z.infer<typeof TaskSchema>) => {
    if (selectedtask.id) {
      updateTask({ ...values, id: selectedtask.id });
    } else {
      createTask(values);
    }
  };
  const handleClose = () => {
    setOpen((pre) => !pre);
    setSelectedTask(defaultTaskData);
  };
  return (
    <div>
      <Dialog onOpenChange={handleClose} open={open}>
        {method === Action.EDIT ? (
          <DialogContent className="sm:max-w-[425px] md:max-w-[650px]">
            <DialogHeader>
              <DialogTitle>{selectedtask.id ? "Edit" : "Add"} Task</DialogTitle>
              <DialogDescription>
                {selectedtask.id ? "Make changes to" : "Add"} your task here.
                Click save when you are done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Type your title here"
                              type="text"
                              disabled={isPending || isPendingTwo}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Type your description here."
                              disabled={isPending || isPendingTwo}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value={Status.TODO}>Todo</SelectItem>
                              <SelectItem value={Status.IN_PROGRESS}>
                                In Progress
                              </SelectItem>
                              <SelectItem value={Status.DONE}>Done</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            You can choose one status.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a priority" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value={Priority.LOW}>Low</SelectItem>
                              <SelectItem value={Priority.MEDIUM}>
                                Medium
                              </SelectItem>
                              <SelectItem value={Priority.HIGH}>
                                High
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            You can choose one priority.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full border-b-0 mt-5"
                    disabled={isPending || isPendingTwo}
                  >
                    Save
                  </Button>
                </form>
              </Form>
            </div>
          </DialogContent>
        ) : (
          <ViewContent selectedtask={selectedtask} />
        )}
      </Dialog>
    </div>
  );
};

export default TaskForm;
