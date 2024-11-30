"use client";

import { ModalInputs, useModal } from "@/app/zustand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, ReactNode, useTransition } from "react";
import { toast } from "sonner";

const SuperButton = ({
  buttonType,
  title,
  className,
  clickHandler,
  Icon,
  ...props
}: SuperButtonProps) => {
  const { setOpen } = useModal();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  // Modal Button
  if (buttonType === "modalButton") {
    const { modalInputs } = props as ModalType; // Explicit narrowing
    const handleClick = () => {
      setOpen(modalInputs);
      console.log(modalInputs)
    };

    return (
      <Button
        variant={"site"}
        className={cn("", className)}
        onClick={handleClick}
      >
        {Icon && Icon}
        {title}
      </Button>
    );
  }

  // Loading Button
  else if (buttonType === "loadingButton") {
    const { loading, loadingTitle,...rest } = props as LoadingType;
    return (
      <Button
      type={props.type ?? 'button'}
        variant={"site"}
        onClick={async () => (clickHandler ? await clickHandler() : undefined)}
        className={cn("disabled:opacity-55", className)}
        {...rest}
        disabled={loading}
      >
        {Icon && Icon}
        {(!!loading && !!loadingTitle) ? loadingTitle : title}
        {!!loading && <Loader2 className="ml-3 animate-spin" />}
      </Button>
    );
  }
  // Link Button
  else if (buttonType === "linkButton") {
    const { href } = props as LinkType;
    return (
      <Button className={cn("", className)} variant={"site"} asChild>
        <Link href={href}>
          {Icon && Icon}
          {title}
        </Link>
      </Button>
    );
  } else if (buttonType === "pushButton") {
    const { href } = props as PushType;

    const handler = () => {
      startTransition(() => {
        router.push(href);
      });
    };

    return (
      <Button disabled={pending} className={cn("disabled:opacity-55", className)} variant={"site"}>
        {Icon && Icon}
        {title}
        {pending && <Loader2 className="ml-3 animate-spin" />}
      </Button>
    );
  } else {
    const { loadingTitle } = props as SignOut;
    const signOutHandler = async () => {
 
      startTransition(async () => {
        try {
          console.log("start transition")
          await signOut();
          console.log("logged out")
        } catch (error) {
          console.error("error logging out",error);
          toast.error("Something went wrong");
        }
      });
    };
    return (
      <Button
        onClick={signOutHandler}
        className={cn("", className)}
        {...props}
        disabled={pending}
      >
        <LogOut className="w-12 h-12 text-white disabled:opacity-55" />
        {pending && loadingTitle ? pending : title}
        {pending && <Loader2 className="ml-3 animate-spin" />}
      </Button>
    );
  }
};

export default SuperButton;

type SuperButtonProps = {
  className?: string;
  title: string;
  clickHandler?: () => Promise<void>;
  Icon?: ReactNode;
} & (ModalType | LoadingType | LinkType | PushType | SignOut) &
  ButtonHTMLAttributes<HTMLButtonElement>;

type LoadingType = {
  buttonType: "loadingButton";
  loadingTitle?: string;
  loading: boolean;
};

type ModalType = { buttonType: "modalButton"; modalInputs: ModalInputs };
type LinkType = {
  buttonType: "linkButton";
  href: string;
};

type PushType = {
  buttonType: "pushButton";
  href: "string";
};

type SignOut = {
  buttonType: "signOut";
  loadingTitle?: string;
};
