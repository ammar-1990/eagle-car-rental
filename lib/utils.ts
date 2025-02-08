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
import { formatInTimeZone } from "date-fns-tz";

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

const getBookingsTotalAmount = (bookings:{totalAmount:number}[])=>{
return bookings.reduce(
  (acc, val) => acc + val.totalAmount,
  0
);
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

  const monthlyRevenue = getBookingsTotalAmount(bookings);

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
      status: "PAID",
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
      status: "PAID",
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
  const currentDayTotal = getBookingsTotalAmount(currentDayBookings);
  const previousDayTotal =getBookingsTotalAmount(previousDayBookings);

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

export const calculateBookingsPerDay = (
  bookings: { startDate: Date; endDate: Date }[],
  startDate: Date,
  endDate: Date
): Record<string, number> => {
  const numBookingsPerDay: Record<string, number> = {};

  bookings.forEach((booking) => {
    const bookingStart = booking.startDate.getTime();
    const bookingEnd = booking.endDate.getTime();

    // console.log("arrival range", startDate);
    // console.log("departure range", endDate);

    // Case 1: Arrival date is the same as departure date

    if (
      new Date(startDate).setHours(0, 0, 0, 0) ===
      new Date(endDate).setHours(0, 0, 0, 0)
    ) {
      if (
        bookingStart <= endDate.getTime() &&
        bookingEnd >= startDate.getTime()
      ) {
        const currentDay = `${startDate.getFullYear()}-${
          startDate.getMonth() + 1
        }-${startDate.getDate()}`;
        numBookingsPerDay[currentDay] =
          (numBookingsPerDay[currentDay] || 0) + 1;
      }
    } else {
      // Case 2: Arrival date is different from departure date

      const currentDate = new Date(startDate);

      while (
        currentDate.getDate() <= endDate.getDate() &&
        currentDate.getMonth() <= endDate.getMonth() &&
        currentDate.getFullYear() <= endDate.getFullYear()
      ) {
        if (currentDate.getDate() === startDate.getDate()) {
          //Case a: Current day is equal to user arrival day
          if (
            bookingStart <=
              new Date(currentDate.getTime()).setHours(23, 30, 0, 0) &&
            bookingEnd >= currentDate.getTime()
          ) {
            const currentDay = `${currentDate.getFullYear()}-${
              currentDate.getMonth() + 1
            }-${currentDate.getDate()}`;
            numBookingsPerDay[currentDay] =
              (numBookingsPerDay[currentDay] || 0) + 1;
          }
        } else if (currentDate.getDate() === endDate.getDate()) {
          //Case b: Current day is equal to user departure day
          if (
            bookingStart <= endDate.getTime() &&
            bookingEnd >= new Date(currentDate.getTime()).setHours(0, 0, 0, 0)
          ) {
            const currentDay = `${currentDate.getFullYear()}-${
              currentDate.getMonth() + 1
            }-${currentDate.getDate()}`;
            numBookingsPerDay[currentDay] =
              (numBookingsPerDay[currentDay] || 0) + 1;
          }
        } else {
          if (
            bookingStart <=
              new Date(currentDate.getTime()).setHours(23, 30, 0, 0) &&
            bookingEnd >= new Date(currentDate.getTime()).setHours(0, 0, 0, 0)
          ) {
            const currentDay = `${currentDate.getFullYear()}-${
              currentDate.getMonth() + 1
            }-${currentDate.getDate()}`;
            numBookingsPerDay[currentDay] =
              (numBookingsPerDay[currentDay] || 0) + 1;
          }
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
  });
  console.log("Bookings Per Day", numBookingsPerDay);
  return numBookingsPerDay;
};

export const checkBookingAvailability = (
  bookings: { startDate: Date; endDate: Date }[],
  startDate: Date,
  endDate: Date,
  numberOfCars: number
): boolean => {
  const bookingsPerDay = calculateBookingsPerDay(bookings, startDate, endDate);

  for (const theDate in bookingsPerDay) {
    console.log("places", bookingsPerDay[theDate]);
    if (bookingsPerDay[theDate] && bookingsPerDay[theDate] >= numberOfCars) {
      console.log("places", bookingsPerDay[theDate]);
      return false;
    }
  }

  return true;
};

export const formatDateUtc = (date: Date) => {
  return formatInTimeZone(date, "UTC", "MMM, dd yyyy - HH:mm");
};

export function formatPhoneNumber(phone: string) {
  // Remove any non-numeric characters
  const cleaned = phone.replace(/[^0-9]/g, "");

  // Format the number into (xxx) xxx-xxxx
  return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
}


export function calculateDuration(startDate: Date, endDate: Date) {
  const msInHour = 1000 * 60 * 60;
  const msInDay = msInHour * 24;
  const msInWeek = msInDay * 7;

  let diff = endDate.getTime() - startDate.getTime();

  let months = Math.floor(diff / (30 * msInDay));
  diff -= months * (30 * msInDay); // Subtract months

  let weeks = Math.floor(diff / msInWeek);
  diff -= weeks * msInWeek; // Subtract weeks

  let days = Math.floor(diff / msInDay);
  diff -= days * msInDay; // Subtract days

  let remainingHours = diff / msInHour; // Remaining hours as decimal

  // If there are extra hours or minutes, round up the days
  if (remainingHours > 0) {
    days += 1;
    remainingHours = 0; // Since we added the hours into days, remaining hours should be 0
  }

  // If days become a full week, convert to weeks
  if (days >= 7) {
    weeks += Math.floor(days / 7);
    days = days % 7; // Keep remaining days
  }

  // If weeks become a full month (assuming 4 weeks = 1 month), convert to months
  if (weeks >= 4) {
    months += Math.floor(weeks / 4);
    weeks = weeks % 4; // Keep remaining weeks
  }

  const totalDays = months * 30 + weeks * 7 + days;

  return {
    months,
    weeks,
    days,
    hours:remainingHours, // Always 0 after rounding
    totalDays
  };
}
