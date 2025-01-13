import React, { Suspense } from "react";
import Heading from "../_components/Heading";
import { wait } from "@/lib/utils";
 
import { Skeleton } from "@/components/ui/skeleton";
import BookingsFeed from "./_components/feeds/BookingsFeed";
import Search from "@/components/Search";
 
 

type Props = {searchParams:Promise<{page:string | undefined,q:string | undefined}>};

const BookingsPage = async ({searchParams}: Props) => {
  let pageNumber =  (await searchParams).page
  const q = (await searchParams).q

  if(!pageNumber || isNaN(Number(pageNumber)) || Number(pageNumber) < 1 || !Number.isInteger(Number(pageNumber))){
   console.warn("Invalid page param::",pageNumber)
   pageNumber = '1'
  }
  return (
    <div>
      <div className="flex justify-between w-full items-center">
      <Heading title="Bookings" />
      <Search  inputType={'input'} searchParam="q" label="Search for Booking" placeholder="BookingID, Name or Email" inputClassName="placeholder:text-[12px]"/>
      </div>
  
      {/* booking feed */}
      <div className="mt-12">
        <Suspense
        key={pageNumber}
          fallback={
            <Skeleton className="h-[600px] w-full mt-2" />
          }
        >
          <BookingsFeed q={q} page={pageNumber}  />
        </Suspense>
      </div>
    </div>
  );
};

export default BookingsPage;
