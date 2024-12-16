import React, { Suspense } from "react";
import Heading from "../_components/Heading";
import { wait } from "@/lib/utils";
 
import { Skeleton } from "@/components/ui/skeleton";
import BookingsFeed from "./_components/feeds/BookingsFeed";
 

type Props = {searchParams:Promise<{page:string | undefined}>};

const BookingsPage = async ({searchParams}: Props) => {
  let pageNumber =  (await searchParams).page

  if(!pageNumber || isNaN(Number(pageNumber)) || Number(pageNumber) < 1 || !Number.isInteger(Number(pageNumber))){
   console.warn("Invalid page param::",pageNumber)
   pageNumber = '1'
  }
  return (
    <div>
      <Heading title="Bookings" />
      {/* booking feed */}
      <div className="mt-12">
        <Suspense
        key={pageNumber}
          fallback={
            <Skeleton className="h-[600px] w-full mt-2 bg-muted-foreground" />
          }
        >
          <BookingsFeed page={pageNumber}  />
        </Suspense>
      </div>
    </div>
  );
};

export default BookingsPage;
