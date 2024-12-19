import React, { Suspense } from "react";
import Heading from "../_components/Heading";
import { getCarsTypes, wait } from "@/lib/utils";
import SuperButton from "@/components/SuperButton";
import { Plus, PlusCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import CarTypeFeed from "./_components/feeds/CarTypeFeed";
import CarsFeed from "./_components/feeds/CarsFeed";
import Search from "@/components/Search";

type Props = { searchParams: Promise<{ carType: string | undefined }> };

const CarsPage = async ({ searchParams }: Props) => {
  const carTypes = (await getCarsTypes()).map((item) => ({
    label: item.title,
    value: item.id,
  }));

  //carType Id to pass to cars feed to filter accordingly
  const carType = (await searchParams).carType;
  //correlated label for above Id to render in no result incase no cars for this id
  const carTypeLabel = carTypes.find((item) => item.value === carType)?.label;
  return (
    <div>
      <div className="flex justify-between">
        <Heading title="Cars" />
        <Search
          label="Search By Car Type"
          searchParam="carType"
          inputType="select"
          renderItem={async (item) => {
            "use server";
            return { label: item.label, value: item.value };
          }}
          values={carTypes}
        />
      </div>

      {/* categories feed */}
      <div className="mt-[80px]">
        <div className="flex items-center gap-8 justify-between">
          <Heading title="Car Type" className="text-md" />
          <SuperButton
            variant="siteSecondary"
            buttonType="modalButton"
            title="Car Type"
            Icon={<Plus className="icon" />}
            modalInputs={{ modal: "carType", data: undefined }}
            className="siteSecondary"
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
            variant="siteSecondary"
            buttonType="linkButton"
            title="Create Car"
            Icon={<Plus className="icon" />}
            className="siteSecondary"
            href="/cars/new"
          />
        </div>

        <Suspense
          key={carType}
          fallback={
            <Skeleton className="h-[200px] w-full mt-2 bg-muted-foreground" />
          }
        >
          <CarsFeed carType={carType} carTypeLabel={carTypeLabel} />
        </Suspense>
      </div>
    </div>
  );
};

export default CarsPage;
