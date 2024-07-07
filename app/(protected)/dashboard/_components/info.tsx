import { auth } from "@/auth";
import { FaUser } from "react-icons/fa";

const Info = async () => {
  const session = await auth();
  return (
    <div className="flex items-start gap-x-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700 flex-1  justify-start uppercase ml-5">
        <FaUser className="h-6 w-6 mr-2" />
        {session?.user?.name}&#39;s tasks
      </div>
    </div>
  );
};

export default Info;
