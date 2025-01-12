import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import CustomError from "./CustomError";
import { cache } from "react";
import prisma from "./prisma";
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns";

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








export const getMonthlyRevenue = async (year: number, month: number) => {
  const startDate = new Date(year, month, 1); // First day of the month
  const endDate = new Date(year, month + 1, 0); // Last day of the month

  const bookings = await prisma.booking.findMany({
    where: {
      status: "PAID",
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      id: true,
      createdAt: true,
      totalAmount: true,
    },
  });

  const monthlyRevenue = bookings.reduce(
    (acc, val) => acc + val.totalAmount,
    0
  );

  return { bookings, monthlyRevenue };
};

export const prepareChartData = (
  bookings: { createdAt: Date; totalAmount: number }[],
  year: number,
  month: number
) => {
  // Get all days in the specified month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(new Date(year, month)),
    end: endOfMonth(new Date(year, month)),
  });

  

  // Initialize data object with all days set to 0
  const dailyTotals: { [key: string]: number } = {};
  daysInMonth.forEach((day) => {
    const formattedDay = format(day, "dd");
    dailyTotals[formattedDay] = 0;
  });

  // Aggregate bookings by day
  bookings.forEach((booking) => {
    const formattedDate = format(booking.createdAt, "dd"); // Format the Date object
    if (dailyTotals[formattedDate] !== undefined) {
      dailyTotals[formattedDate] += booking.totalAmount;
    }
  });

  // Convert to chart-friendly format
  const chartData = Object.entries(dailyTotals)
    .map(([date, total]) => ({
      x: date, // Date as the x-axis label
      y: total, // Total amount as the y-axis value
    }))
    .sort((a, b) => Number(a.x) - Number(b.x));

  return chartData;
};
