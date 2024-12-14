import { Car } from "@prisma/client";

export const SEATS = [2, 5, 7, 8];
export const SEATS_CONST = [2, 5, 7, 8] as const;
export const SEATS_MAP: Record<(typeof SEATS_CONST)[number], string> = {
  "2": "2 Seats",
  "5": "5 Seats",
  "7": "7 Seats",
  "8": "8 Seats",
};

export const FUEL = ["GASOLINE", "DIESEL", "ELECTRIC", "HYBRID"];
export const FUEL_CONST = ["GASOLINE", "DIESEL", "ELECTRIC", "HYBRID"] as const;
export const FUEL_MAP: Record<(typeof FUEL_CONST)[number], string> = {
  GASOLINE: "gasoline",
  DIESEL: "diesel",
  ELECTRIC: "electric",
  HYBRID: "hybrid",
};

export const LOCATIONS = ["LOS_ANGELES", "LAS_VEGAS", "ORLANDO"];
export const LOCATIONS_CONST = ["LOS_ANGELES", "LAS_VEGAS", "ORLANDO"] as const;
export const LOCATIONS_MAP: Record<(typeof LOCATIONS_CONST)[number], string> = {
  LAS_VEGAS: "las vegas",
  LOS_ANGELES: "los angeles",
  ORLANDO: "orlando",
};

export type CarCardWithCarType = {
  id:string,
  image:string,
  subTitle:string,
  slug:string,
  carType:{title:string}}
