import React from "react";
import SuperButton from "./SuperButton";
import { cn } from "@/lib/utils";
import { TAKE_BOOKINGS } from "@/lib/Types";

type Props = {
  count: number;
  page: number;
  href: string;
};

const Pagination = ({ count, href, page }: Props) => {
  return (
    <div className="flex items-center justify-between w-full">
      <SuperButton
      variant="secondary"
        className={cn(page <=1 && 'invisible')}
        buttonType="linkButton"
        href={`${href}?page=${page - 1}`}
        title="Back"
      />
      <span className="text-xs text-muted-foreground">{page}/{Math.ceil(count / TAKE_BOOKINGS)}</span>
      <SuperButton
      variant="secondary"
        className={cn((page * TAKE_BOOKINGS >= count ) && 'invisible')}
        buttonType="linkButton"
        href={`${href}?page=${page + 1}`}
        title="Next"
      />
    </div>
  );
};

export default Pagination;
