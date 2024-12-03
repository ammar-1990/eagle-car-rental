import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import CustomError from "./CustomError";

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
