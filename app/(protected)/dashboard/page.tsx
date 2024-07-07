import React, { Suspense } from "react";
import Info from "./_components/info";
import { Separator } from "@/components/ui/separator";
import { TaskList } from "./_components/task-list";

const DashboardPage = () => {
  // const {} =useForm
  return (
    <div className="flex flex-col space-y-4 p-5">
      <div className="w-full mb-20">
        <Info />
        <Separator className="my-4" />
        <div className="px-2 md:px-4">       
          <TaskList />
        </div>
      </div>
    </div>
    // <EditBox/>
  );
};

export default DashboardPage;
