import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import CustomError from "./CustomError";
import { cache } from "react";
import prisma from "./prisma";
import {
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  format,
  startOfDay,
  startOfMonth,
  subDays,
} from "date-fns";

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
  shouldLog?: boolean;
  type?: "error" | "warn" | "";
  messages: unknown[];
}): void {
  if (shouldLog) {
    switch (type) {
      case "warn": {
        console.warn(messages);
        break;
      }
      case "error": {
        console.error(messages);
        break;
      }
      default: {
        console.log(messages);
      }
    }
  }
}

export const throwCustomError = (message: string): never => {
  throw new CustomError(message);
};

export const errorToast = (message: string = "Something went wrong") =>
  toast.error(message);

export function formatToDollar(value: number): string {
  if (isNaN(value)) {
    throw new Error("Invalid number input");
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export const getCarsTypes = cache(async () => {
  const carTypes = await prisma.carType.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return carTypes;
});

export function generateTimeSlots(interval: number = 30): string[] {
  const times: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(
        2,
        "0"
      )}`;
      times.push(time);
    }
  }
  return times;
}

export function convertDateToISOString(date: Date | undefined) {
  if (!date) {
    return undefined;
  }

  // Manually construct the ISO string in YYYY-MM-DD format
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const day = date.getDate();

  // Pad single digit month and day with leading zeros
  const paddedMonth = month.toString().padStart(2, "0");
  const paddedDay = day.toString().padStart(2, "0");

  return `${year}-${paddedMonth}-${paddedDay}`;
}

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

export const getDailyRevenue = async (date: Date) => {
  const currentDayStart = startOfDay(date);
  const currentDayEnd = endOfDay(date);
  const previousDayStart = startOfDay(subDays(date, 1));
  const previousDayEnd = endOfDay(subDays(date, 1));

  // Fetch bookings for the current day
  const currentDayBookingsRes = prisma.booking.findMany({
    where: {
      createdAt: {
        gte: currentDayStart,
        lte: currentDayEnd,
      },
    },
    select: {
      totalAmount: true,
    },
  });

  // Fetch bookings for the previous day
  const previousDayBookingsRes = prisma.booking.findMany({
    where: {
      createdAt: {
        gte: previousDayStart,
        lte: previousDayEnd,
      },
    },
    select: {
      totalAmount: true,
    },
  });

  const [currentDayBookings, previousDayBookings] = await Promise.all([
    currentDayBookingsRes,
    previousDayBookingsRes,
  ]);
  const currentDayTotal = currentDayBookings.reduce(
    (sum, booking) => sum + booking.totalAmount,
    0
  );
  const previousDayTotal = previousDayBookings.reduce(
    (sum, booking) => sum + booking.totalAmount,
    0
  );

  let percentageChange: string;
  let trend: "up" | "down" | "neutral";

  if (previousDayTotal === 0) {
    if (currentDayTotal === 0) {
      percentageChange = "No revenue on both days";
      trend = "neutral";
    } else {
      percentageChange = "New revenue today";
      trend = "up";
    }
  } else {
    const change =
      ((currentDayTotal - previousDayTotal) / previousDayTotal) * 100;
    percentageChange = `${change.toFixed(2)}%`;

    if (change > 0) {
      trend = "up";
    } else if (change < 0) {
      trend = "down";
    } else {
      trend = "neutral";
    }
  }

  return {
    dailyRevenue: currentDayTotal,
    yesterDayRevenue: previousDayTotal,
    percentageChange,
    trend,
  };
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

export function combineDateAndTimeToUTC(
  dateString: string,
  timeString: string
) {
  // Combine the date and time strings
  const combinedDateTimeString = `${dateString}T${timeString}:00.000Z`;

  // Create a Date object from the combined string
  const utcDate = new Date(combinedDateTimeString);

  return utcDate;
}
