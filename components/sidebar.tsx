"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { UserButton } from "./auth/user-button";
import { auth } from "@/auth";
import SidebarItem from "./sidebar-item";
import { FcHome } from "react-icons/fc";
import { FcAddDatabase } from "react-icons/fc";
import { menuItems } from "@/data/menu-items";

type Props = {
  className?: string;
};

const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        `lg:fixed  h-full lg:w-[256px] 
     left-0 top-0 px-4 border-r-2 flex-col`,
        className
      )}
    >
      <div className="flex flex-col gap-y-3 flex-1 mt-10">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.label}
            label={item.label}
            href={item.href}
            Icon={item.icon}
          />
        ))}
      </div>
      <div className="p-4 fixed bottom-5 left-20">
        <div className="flex flex-col gap-2 items-center">
          <UserButton />
          <span className="text-sm">Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
