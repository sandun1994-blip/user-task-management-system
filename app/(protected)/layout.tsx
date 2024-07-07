import MobileHeader from "@/components/mobile-header";
import Sidebar from "@/components/sidebar";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
   <>
    <MobileHeader/>
    <Sidebar className="hidden lg:flex"/>
      <main className=" lg:pl-[256px]  h-full pt-[50px] lg:pt-0">
        <div className="bg-white h-full  w-full flex flex-col gap-y-10 ">{children}</div>
      </main>
      </>
  );
};

export default DashboardLayout;
