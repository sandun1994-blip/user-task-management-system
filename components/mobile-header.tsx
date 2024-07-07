import React from "react";
import MobileSidebar from "./mobile-sidebar";

const MobileHeader = () => {
  return (
    <nav
      className="lg:hidden px-6 h-[50px] flex items-center  border-b fixed top-0 w-full z-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
     from-sky-400 to-blue-800"
    >
      <MobileSidebar />
    </nav>
  );
};

export default MobileHeader;
