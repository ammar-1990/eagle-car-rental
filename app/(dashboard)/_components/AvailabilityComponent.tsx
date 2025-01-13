"use client";

import React from "react";
import ComboBoxField from "./ComboboxField";
import { useDailyRevenue } from "@/app/hooks/useDailyRevenue";
import DateField from "./DataField";
import PopOverField from "./PopoverField";
import { Loader } from "lucide-react";
import SuperButton from "@/components/SuperButton";
import { cn } from "@/lib/utils";
import { formatInTimeZone } from "date-fns-tz";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  cars: { id: string; subTitle: string; carType: { title: string } }[];
};

const AvailabilityComponent = ({ cars }: Props) => {
  const refactoredCars = cars.map((car) => ({
    value: car.id,
    label: `${car.carType.title} - ${car.subTitle}`,
  }));

  const {
    availabilityQuery,
    carId,
    endDate,
    endTime,
    hours,
    setCarIdFn,
    setEndDateFn,
    setEndTimeFn,
    setStartDateFn,
    setStartTimeFn,
    startDate,
    startTime,
    fetchFn,
  } = useDailyRevenue();

  const { data, error, isPending } = availabilityQuery;
  const success = data?.success;
  const isAvailable = success ? data.available : undefined;
  const dates = success && data.available === false ? data.dates : undefined;
  const message = success ? data.message : "";

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <ComboBoxField
          items={refactoredCars}
          placeholder="Choose a car"
          stateLabel="Choose Car"
          value={carId}
          setValue={(value: string) => {
            setCarIdFn(value);
          }}
          push={false}
          param=""
        />

        <div className="flex flex-col gap-2">
          <DateField
            placeholder="Choose Start Date"
            setValue={(value: string) => setStartDateFn(value)}
            value={startDate}
            stateLabel="Start Date"
          />
          <PopOverField
            items={hours}
            setValue={(val: string) => setStartTimeFn(val)}
            value={startTime}
            placeholder="Start Time"
            stateLabel="Start Time"
          />
        </div>

        <div className="flex flex-col gap-2">
          <DateField
            placeholder="Choose End Date"
            setValue={(value: string) => setEndDateFn(value)}
            value={endDate}
            stateLabel="End Date"
          />
          <PopOverField
            items={hours}
            setValue={(val: string) => setEndTimeFn(val)}
            value={endTime}
            placeholder="End Time"
            stateLabel="End Time"
          />
        </div>

        <div className="flex items-center justify-center">
          {isPending && (
           <Skeleton className="rounded-md w-full min-h-[150px]  " />
          )}
          {error && (
            <p className="p-3 border-red-500 text-red-500 bg-red-50 rounded-md border">
              {error.message}
            </p>
          )}
          {data?.success && (
            <div>
              {
                <p
                  className={cn(
                    isAvailable
                      ? "text-green-500 bg-green-100 border-green-500 border rounded-md p-4"
                      : "text-yellow-500 bg-yellow-100 border-yellow-500 border rounded-md p-4"
                  )}
                >
                  {message}
                </p>
              }
              {dates?.length && (
                <div className="flex flex-col gap-3 mt-3">
                  <p className="font-semibold capitalize">
                    Found {dates.length}
                    {` booking${dates.length > 1 ? "s" : ""} in this range`}
                  </p>
                  {dates.map((date, index) => (
                    <div key={index} className="text-xs flex flex-col gap-1">
                      <span className="flex items-center gap-1">
                        <span className="text-md font-semibold">
                          Start Date:{" "}
                        </span>

                        <span className="text-xs text-muted-foreground">
                          {formatInTimeZone(new Date(date.startDate),"UTC", "MMM, dd yyyy - HH:mm")}
                        </span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-md font-semibold">
                          End Date:{" "}
                        </span>

                        <span className="text-xs text-muted-foreground">
                          {formatInTimeZone(new Date(date.endDate),"UTC", "MMM, dd yyyy - HH:mm")}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <SuperButton
        title="Check Car"
        loading={isPending}
        buttonType="loadingButton"
        clickHandler={fetchFn}
      />
    </div>
  );
};

export default AvailabilityComponent;
