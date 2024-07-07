"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FcAddDatabase } from "react-icons/fc";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  href: string;
  Icon: any;
};
const SidebarItem = ({ label, href, Icon }: Props) => {
  const pathname = usePathname();

  const active = pathname === href;
  return (
    <Link href={href}>
      <div
        className={cn(
          " p-3 flex items-center gap-x-3  mr-5 hover:bg-sky-200 rounded-lg   text-md font-medium hover:text-blue-500",
          active && "bg-sky-200 text-blue-500"
        )}
      >
        <Icon className="w-6 h-6" />
        <span className="ml-2 "> {label}</span>
      </div>
    </Link>
  );
};

export default SidebarItem;
