import { LoginButtton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main
      className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
   flex h-full flex-col items-center justify-center  from-sky-400 to-blue-800"
    >
      <div className="space-y-10 text-center">
        <h1
          className={cn(
            "text-2xl md:text-6xl font-semibold text-white drop-shadow-md capitalize",
            font.className
          )}
        >
          user task management system.
        </h1>
        <div>
          <LoginButtton>
            <Button variant={"secondary"} size="lg">
              Sign In
            </Button>
          </LoginButtton>
        </div>
      </div>
    </main>
  );
}
