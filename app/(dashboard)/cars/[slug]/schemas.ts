import { SEATS } from "@/lib/Types";
import { Fuel } from "@prisma/client";
import { z } from "zod";
const requiredStringSchema = z.string().min(1,"Required")
const numberSchema = z.string().min(1,'Required').refine(data=>data.replace(/[^0-9.]/g, ""),{message:'Only Numbers'})
export const carSchema = z.object({
    slug:requiredStringSchema,
    carTypeId:requiredStringSchema,
    subTitle:requiredStringSchema,
    locationId:requiredStringSchema,
    seats: numberSchema.refine((data) => SEATS.includes(Number(data)), {
        message: 'Enter a valid seat number',
      }),
      fuel:z.nativeEnum(Fuel).refine(data=>!!data,{message:'Enter Valid Fuel Type Please'})

})



export const extraOptionsSchema = z.object({
    title:z.string().min(1,'Required').max(100),
    price:numberSchema
})


export const pricingSchema = z.object({
    days:z.array(numberSchema).length(6,"Enter 6 Days"),
    weeks:z.array(numberSchema).length(3,"Enter 3 Weeks"),
    months:z.array(numberSchema).length(6,"Enter 6 Months")
})