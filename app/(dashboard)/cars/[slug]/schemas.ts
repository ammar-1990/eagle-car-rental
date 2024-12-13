import { SEATS } from "@/lib/Types";
import { Fuel, Locations } from "@prisma/client";
import { z } from "zod";
const requiredStringSchema = z.string().min(1,"Required")
const numberSchema = z.string().min(1,'Required').refine(data=>/^[0-9.]*$/.test(data),{message:'Only Numbers'})

export const extraOptionsSchema = z.object({
    title:z.string().min(1,'Required').max(100),
    price:numberSchema
})


export const pricingSchema = z.object({
    hour:numberSchema,
    days:z.array(numberSchema).length(6,"Enter 6 Days"),
    weeks:z.array(numberSchema).length(3,"Enter 3 Weeks"),
    months:z.array(numberSchema).length(6,"Enter 6 Months")
})

export const carSchema = z.object({
    slug:requiredStringSchema,
    carTypeId:requiredStringSchema,
    subTitle:requiredStringSchema,
  location:z.nativeEnum(Locations).refine(data=>!!data,{message:'Enter Valid Location Please'}),
    seats: numberSchema.refine((data) => SEATS.includes(Number(data)), {
        message: 'Enter a valid seat number',
      }),
      fuel:z.nativeEnum(Fuel).refine(data=>!!data,{message:'Enter Valid Fuel Type Please'}),
      image:requiredStringSchema,
      pricing:pricingSchema,
      extraOptions:z.array(extraOptionsSchema),
      kmIncluded:numberSchema,
      minimumRentalHours:numberSchema,
      deposit:numberSchema,
      disabled:z.boolean()
    })


export type PricingType = z.infer<typeof pricingSchema>
export type ExtraOptionsType = z.infer<typeof extraOptionsSchema>



