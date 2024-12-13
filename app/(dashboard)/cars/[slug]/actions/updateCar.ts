"use server";

import { z } from "zod";
import { carSchema } from "../schemas";
import { auth } from "@/auth";
import { throwCustomError } from "@/lib/utils";
import CustomError from "@/lib/CustomError";
import prisma from "@/lib/prisma";

export const updateCar = async ({
  data,
  id,
}: {
  data: z.infer<typeof carSchema>;
  id: string;
}): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session) return throwCustomError("Unauthorized");
    if (!id) return throwCustomError("Car ID Is Required");
    const validData = carSchema.safeParse(data);
    if (!validData.success) return throwCustomError("Input Error");

    const {
      extraOptions,
      seats,
      kmIncluded,
      deposit,
      minimumRentalHours,
      ...rest
    } = validData.data;
    const slugExists = await prisma.car.findUnique({
      where: {
        slug: validData.data.slug,
      },
    });
    if (slugExists) return throwCustomError("Slug Already Exists");

    return { message: "Car Updated Successfully", success: true };

    await prisma.car.update({
      where: {
        id,
      },
      data: {
        ...rest,
        seats: Number(seats),
        kmIncluded: Number(kmIncluded),
        deposit: Number(deposit),
        minimumRentalHours: Number(minimumRentalHours),
        extraOptions: {
          createMany: {
            data: extraOptions.map((option) => ({
              price: Number(option.price),
              title: option.title,
            })),
          },
        },
      },
    });

    return { message: "Car Updated Successfully", success: true };
  } catch (error) {
    console.error(error);
    if (error instanceof CustomError) {
      return {
        success: false,
        message: error.message,
      };
    }
    return { success: false, message: "Internal Server Error" };
  }
};
