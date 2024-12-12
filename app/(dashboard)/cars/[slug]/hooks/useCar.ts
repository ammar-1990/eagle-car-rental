"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  carSchema,
  extraOptionsSchema,
  ExtraOptionsType,
  PricingType,
} from "../schemas";
import { Car } from "@prisma/client";
import { log } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const useCar = (car: Car | null, extraOptions: ExtraOptionsType[]) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof carSchema>>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      slug: car?.slug ?? "",
      carTypeId: car?.carTypeId ?? "",
      subTitle: car?.subTitle ?? "",
      location: car?.location ?? "LAS_VEGAS",
      seats: String(car?.seats ?? ""),
      fuel: car?.fuel ?? "DIESEL",
      image: car?.image ?? "",
      pricing: (car?.pricing as unknown as PricingType) ?? {
        hour: "",
        days: Array(6).fill(""),
        weeks: Array(3).fill(""),
        months: Array(6).fill(""),
      },
      extraOptions: !!extraOptions.length
        ? extraOptions
        : [
            { price: "", title: "" },
            { price: "", title: "" },
          ],
      kmIncluded: `${car?.kmIncluded ?? ""}`,
      minimumRentalHouds: `${car?.minimumRentalHours ?? ""}`,
      deposit: `${car?.deposit ?? ""}`,
      disabled: car?.disabled,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof carSchema>) {
    alert(JSON.stringify(values,undefined,2))
    log({
      messages: ["Car Values", values],
      shouldLog: true,
    });
  }


  return { form, onSubmit, pending};
};
