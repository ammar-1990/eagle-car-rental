import prisma from "@/lib/prisma";
import React from "react";

import NoResult from "@/components/NoResult";

type Props = {};

const CarsFeed = async (props: Props) => {
  const cars = await prisma.car.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
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
        <div className="min-h-[100px] flex gap-2 items-center flex-wrap mt-2">
          {cars.map((car) => (
            <div key={car.id}>{car.carType.title}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarsFeed;
