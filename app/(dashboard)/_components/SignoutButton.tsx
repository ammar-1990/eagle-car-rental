"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useTransition } from "react";
import { toast } from "sonner";
import LoadingButton from "./LoadingButton";
import { LogOut } from "lucide-react";

export function SignoutButton() {
  const [pending, startTransition] = useTransition();
  const clickHandler = async () => {
    startTransition(async () => {
      try {
        await signOut();
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <LoadingButton
      Icon={<LogOut className="w-12 h-12 text-white" />}
      className="mt-auto bg-[#41516E] hover:bg-[#41516E]/85"
      clickHandler={clickHandler}
      title="Logout"
      loading={pending}
    />
  );
}
