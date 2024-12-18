import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import CustomError from "./CustomError";
import { cache } from "react";
import prisma from "./prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const wait = async (time: number = 1500) =>
  new Promise((r) => setTimeout(r, time));
export function log({
  shouldLog = true,
  messages,
  type,
}: {
  shouldLog?: boolean ;
  type?: "error" | "warn" | '';
  messages: unknown[];
}): void {
  if (shouldLog) {

    switch(type){
      case 'warn':{
        console.warn(messages);
        break;
      }
      case 'error':{
        console.error(messages);
        break;
      }
      default:{
        console.log(messages);
      }
    }

  }
}

export const throwCustomError = (message: string): never => {
  throw new CustomError(message);
};

export const errorToast = (message:string = "Something went wrong")=>toast.error(message)


export function formatToDollar(value: number): string {
  if (isNaN(value)) {
    throw new Error("Invalid number input");
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}


export const getCarsTypes =  cache(async()=>{
  const carTypes = await prisma.carType.findMany({orderBy:{
    createdAt:'desc'
  }})

  return carTypes
})