"use client";

import { ModalInputs, useModal } from "@/app/zustand";
import { Button } from "@/components/ui/button";
import { cn, log } from "@/lib/utils";
import { Loader2, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, ReactNode, useTransition } from "react";
import { toast } from "sonner";

const SuperButton = (props: SuperButtonProps) => {
  return renderButton(props);
};

export default SuperButton;

const renderButton = (props: SuperButtonProps) => {
  const { buttonType } = props;

  switch (buttonType) {
    case "linkButton": {
      return renderLinkButton(props);
    }
    case "loadingButton": {
      return renderLoadingButton(props);
    }
    case "modalButton": {
      return renderModalButton(props);
    }
    case "pushButton": {
      return renderPushButton(props);
    }
    case "signOut": {
      return renderSignoutButton(props);
    }
  }
};

const renderLinkButton = (
  props: LinkType & NormalButton & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { title, Icon, className, href, buttonType, ...rest } = props;

  return (
    <Button {...rest} className={cn("", className)} variant={"site"} asChild>
      <Link href={href}>
        {Icon && Icon}
        {title}
      </Link>
    </Button>
  );
};

const renderLoadingButton = (
  props: LoadingType & NormalButton & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const {
    title,
    clickHandler,
    className,
    Icon,
    loading,
    loadingTitle,
    buttonType,
    ...rest
  } = props;
  return (
    <Button
      {...rest}
      type={props.type ?? "button"}
      variant={"site"}
      onClick={async () => (clickHandler ? await clickHandler() : undefined)}
      className={cn("disabled:opacity-55", className)}
      disabled={loading}
    >
      {Icon && Icon}
      {!!loading && !!loadingTitle ? loadingTitle : title}
      {!!loading && <Loader2 className="ml-3 animate-spin" />}
    </Button>
  );
};

const renderModalButton = (
  props: NormalButton & ModalType & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { title, className, Icon, modalInputs, buttonType, ...rest } = props;
  const { setOpen } = useModal();
  const handleClick = () => {
    setOpen(modalInputs);
   log({

    messages:[modalInputs],
   });
  };

  return (
    <Button
      {...rest}
      variant={"site"}
      className={cn("", className)}
      onClick={handleClick}
    >
      {Icon && Icon}
      {title}
    </Button>
  );
};

const renderPushButton = (
  props: NormalButton & PushType & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { title, Icon, className, href, buttonType, ...rest } = props;
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const handler = () => {
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <Button
      {...rest}
      disabled={pending}
      className={cn("disabled:opacity-55", className)}
      variant={"site"}
    >
      {Icon && Icon}
      {title}
      {pending && <Loader2 className="ml-3 animate-spin" />}
    </Button>
  );
};

const renderSignoutButton = (
  props: NormalButton & SignOutType & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { title, className, loadingTitle, buttonType, ...rest } = props;
  const [pending, startTransition] = useTransition();
  const signOutHandler = async () => {
    startTransition(async () => {
      try {
        await signOut();
      } catch (error) {
        console.error("error logging out", error);
        toast.error("Something went wrong");
      }
    });
  };
  return (
    <Button
      {...rest}
      onClick={signOutHandler}
      className={cn("", className)}
      disabled={pending}
    >
      <LogOut className="w-12 h-12 text-white disabled:opacity-55" />
      {pending && loadingTitle ? pending : title}
      {pending && <Loader2 className="ml-3 animate-spin" />}
    </Button>
  );
};






//types 

type SuperButtonProps = NormalButton &
  (ModalType | LoadingType | LinkType | PushType | SignOutType) &
  ButtonHTMLAttributes<HTMLButtonElement>;

type LoadingType = {
  buttonType: "loadingButton";
  loadingTitle?: string;
  loading: boolean;
};

type NormalButton = {
  className?: string;
  title: string;
  clickHandler?: () => Promise<void>;
  Icon?: ReactNode;
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

type SignOutType = {
  buttonType: "signOut";
  loadingTitle?: string;
};