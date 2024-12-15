import React, { Suspense } from "react";
import Heading from "../_components/Heading";
import { wait } from "@/lib/utils";
 
import { Skeleton } from "@/components/ui/skeleton";
import BookingsFeed from "./_components/feeds/BookingsFeed";
 

type Props = {};

const BookingsPage = async (props: Props) => {
  return (
    <div>
      <Heading title="Bookings" />
      {/* booking feed */}
      <div className="mt-12">
        <Suspense
          fallback={
            <Skeleton className="h-[600px] w-full mt-2 bg-muted-foreground" />
          }
        >
          <BookingsFeed />
        </Suspense>
      </div>
    </div>
  );
};

export default BookingsPage;
