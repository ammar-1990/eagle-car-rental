import prisma from "@/lib/prisma";
import React from "react";

import NoResult from "@/components/NoResult";
import CarCard from "../cards/CarCard";

type Props = {};

const CarsFeed = async (props: Props) => {
  const cars = await prisma.car.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id:true,
      slug:true,
      image:true,
      subTitle:true,
      carType: {
        select: {
          title: true,
        },
      },
    },
  });

  return (
    <div>
      {!cars.length && (
        <div className="mt-2">
          <NoResult title="No Cars" description="Create Cars To Show Here" />
        </div>
      )}
      {!!cars.length && (
        <div className="min-h-[100px]  gap-[22px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-2">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarsFeed;
