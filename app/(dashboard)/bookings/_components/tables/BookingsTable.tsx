//bg-[#ECFDF3] text-green-700
//bg-yellow-50 text-yellow-700

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

type Props = { bookings: BookingTable[] };

const BookingsTable = ({ bookings }: Props) => {
  return (
    <div>
      {!bookings.length && (
        <NoResult title="No Bookings" description="You Have No Bookings Yet" />
      )}

      {!!bookings.length && (
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
                    {format(new Date(booking.createdAt), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell className="text-[#101828] font-[500] capitalize">
                    {booking.firstName} {booking.lastName}
                  </TableCell>
                  <TableCell className="">{booking.email}</TableCell>
                  <TableCell className="">
                    <span
                      className={cn(
                        "capitalize py-0.5 px-3 rounded-full text-[12px] font-[500] flex items-center w-fit",
                        BOOKING_STATUS_MAP_CLASSNAME[booking.status]
                      )}
                    >
                      {booking.status === 'PAID' && <Check className="mr-1 h-3 w-3 text-green-700" />}
                      {BOOKING_STATUS_MAP[booking.status]}
                    </span>
                  </TableCell>
                  <TableCell className="">{formatToDollar(booking.totalAmount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default BookingsTable;
