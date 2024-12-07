import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import Heading from "../_components/Heading";
import { wait } from "@/lib/utils";
import SuperButton from "@/components/SuperButton";
import { PlusCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import CarTypeFeed from "./_components/feeds/CarTypeFeed";
import CarsFeed from "./_components/feeds/CarsFeed";

type Props = {};

const CarsPage = async (props: Props) => {
  return (
    <div>
      <Heading title="Cars" />
      {/* categories feed */}
      <div className="mt-[80px]">
        <div className="flex items-center gap-8 justify-between">
          <Heading title="Car Type" className="text-md" />
          <SuperButton
            buttonType="modalButton"
            title="Car Type"
            Icon={<PlusCircle className="icon" />}
            modalInputs={{ modal: "carType", data: undefined }}
          />
        </div>
        <Suspense
          fallback={
            <Skeleton className="h-[200px] w-full mt-2 bg-muted-foreground" />
          }
        >
          <CarTypeFeed />
        </Suspense>
      </div>
      {/* Cars Feed */}
      <div className="mt-[80px]">
        <div className="flex items-center gap-8 justify-between">
          <Heading title="Cars" className="text-md" />
          <SuperButton
            buttonType="linkButton"
            title="Create Car"
            Icon={<PlusCircle className="icon" />}
            href="/cars/new"
          />
        </div>
        <Suspense
          fallback={
            <Skeleton className="h-[200px] w-full mt-2 bg-muted-foreground" />
          }
        >
          <CarsFeed />
        </Suspense>
      </div>
    </div>
  );
};

export default CarsPage;
