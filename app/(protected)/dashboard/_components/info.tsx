
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dispatch, SetStateAction } from "react";
import { FaUser } from "react-icons/fa";
import { RiAddLargeLine } from "react-icons/ri";



const Info = () => {


  return (
    <div className="flex items-start gap-x-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700 flex-1  justify-start uppercase ml-5">
        <FaUser className="h-6 w-6 mr-2" />
        sandun&#39;s tasks
      </div>
    </div>
  );
};

export default Info;

