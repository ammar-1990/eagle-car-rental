"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React, { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

type Props = {
  loading: boolean;
  title: string;
  loadingTitle?: string;
  className?: string;
  clickHandler?: () => Promise<void>;
  Icon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const LoadingButton = ({
  loading,
  title,
  loadingTitle,
  className,
  clickHandler,
  Icon,
  ...props
}: Props) => {
  return (
    <Button
    variant={'site'}
      onClick={async () =>clickHandler ?  await clickHandler() : undefined}
      className={cn("", className)}
      {...props}
      disabled={loading}
    >
      {Icon && Icon}
      {loading && loadingTitle ? loading : title}
      {loading && <Loader2 className="ml-3 animate-spin" />}
    </Button>
  );
};

export default LoadingButton;
