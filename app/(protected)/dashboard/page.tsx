import React, { Suspense } from "react";
import Info from "./_components/info";
import { Separator } from "@/components/ui/separator";
import TaskContainer from "./_components/task-container";

const DashboardPage = async () => {
 
  return (
    <div className="flex flex-col space-y-4 p-5">
      <div className="w-full mb-20">
        <Info />
        <Separator className="my-4" />
        <Suspense fallback={<TaskContainer.Loading />}>
          <TaskContainer />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardPage;
