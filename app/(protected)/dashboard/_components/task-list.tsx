"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { RiAddLargeLine } from "react-icons/ri";
import TaskForm from "./task-form";
import { Task } from "@prisma/client";
import TaskCard from "./task-card";
import { Action } from "@/types";
import { AlertDialogBox } from "@/components/alert-dialog";
import { SelectBox } from "@/components/select-box";
import { priorityItem, statusItem } from "@/data/constatnt";
import { Separator } from "@/components/ui/separator";
import { LuTimerReset } from "react-icons/lu";
type Props = {
  tasks: Task[];
};

export const TaskList = ({ tasks }: Props) => {
  const [selectedtask, setSelectedTask] = useState<Partial<Task>>({});
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [method, setMethod] = useState<Action>(Action.EDIT);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");

  const tasksData = useMemo(() => {
    return tasks.filter((task) => {
      return (
        (selectedStatus ? task.status === selectedStatus : true) &&
        (selectedPriority ? task.priority === selectedPriority : true)
      );
    });
  }, [tasks, selectedStatus, selectedPriority]);

  const handleReset = () => {
    setSelectedStatus("");
    setSelectedPriority("");
  };

  return (
    <>
      {open && (
        <TaskForm
          setOpen={setOpen}
          open={open}
          setSelectedTask={setSelectedTask}
          selectedtask={selectedtask}
          method={method}
        />
      )}
      {openDelete && (
        <AlertDialogBox
          setOpen={setOpenDelete}
          open={openDelete}
          setSelectedTask={setSelectedTask}
          selectedtask={selectedtask}
        />
      )}
      <div className="space-y-4">
        <div className="w-full  md:flex space-y-4 md:space-y-0 items-center justify-between gap-10 ">
          <Button
            variant="outline"
            onClick={() => {
              setMethod(Action.EDIT);
              setOpen(true);
            }}
          >
            {" "}
            <RiAddLargeLine className="w-4 h-4 mr-2 " /> Add Task
          </Button>

          <SelectBox
            title="Select a status"
            label="Status"
            items={statusItem}
            setSelectedValue={setSelectedStatus}
            selectedValue={selectedStatus}
          />

          <SelectBox
            title="Select a priority"
            label="Priority"
            items={priorityItem}
            setSelectedValue={setSelectedPriority}
            selectedValue={selectedPriority}
          />
          <div className="flex-1 flex justify-start ">
            {(selectedPriority || selectedStatus) && (
              <Button
                variant="destructive"
                className=""
                size={"sm"}
                onClick={handleReset}
              >
                {" "}
                <LuTimerReset className="w-4 h-4 mr-2 " /> Reset
              </Button>
            )}
          </div>
        </div>
        <Separator />
        <div className="grid md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tasksData.length > 0 &&
            tasksData.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                setSelectedTask={setSelectedTask}
                setOpen={setOpen}
                setMethod={setMethod}
                setOpenDelete={setOpenDelete}
              />
            ))}
        </div>
      </div>
    </>
  );
};
