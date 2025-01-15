'use client'

//bg-[#ECFDF3] text-green-700
//bg-yellow-50 text-yellow-700
//bg-red-50 text-red-700

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import {
  BOOKING_STATUS_MAP,
  BOOKING_STATUS_MAP_CLASSNAME,
  BookingTable,
} from "@/lib/Types";
import NoResult from "@/components/NoResult";
import { cn, formatToDollar } from "@/lib/utils";
import { Check } from "lucide-react";
import Badge from "@/components/Badge";
import Pagination from "@/components/Pagination";

type Props = { bookings: BookingTable[];  bookingsCount: number,q:string | undefined };

const BookingsTable = ({ bookings, bookingsCount,q }: Props) => {
  return (
    <div>
      {!bookingsCount && (
        <NoResult title="No Bookings" description={q ? `No bookings For This Query  "${q}" ` : 'No Bookings Yet'} />
      )}

      {!!bookingsCount && (
        <div>
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Booking Number</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="">Email Address</TableHead>
                  <TableHead className="">Status</TableHead>
                  <TableHead className="">Total Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-[#475467] text-[14px]">
                {bookings.map((booking) => (
                  <TableRow key={booking.bookingID}>
                    <TableCell className="">{booking.bookingID}</TableCell>
                    <TableCell>
                      {format(new Date(booking.createdAt), "MMM, dd yyyy - HH:mm")}
                    </TableCell>
                    <TableCell className="text-[#101828] font-[500] capitalize">
                      {booking.firstName} {booking.lastName}
                    </TableCell>
                    <TableCell className="">{booking.email}</TableCell>
                    <TableCell className="">
                      <Badge status={booking.status} />
                    </TableCell>
                    <TableCell className="">
                      {formatToDollar(booking.totalAmount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
     <div className="mt-4">
            <Pagination
              count={bookingsCount}
              href="/bookings"
            
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsTable;
