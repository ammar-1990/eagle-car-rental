import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import Heading from "../../_components/Heading";
import { format } from "date-fns";
import { formatDateUtc, formatPhoneNumber, formatToDollar } from "@/lib/utils";
import { ExtraOptionsType } from "../../cars/[slug]/schemas";
import SuperButton from "@/components/SuperButton";
import { ChevronLeft } from "lucide-react";
import Badge from "@/components/Badge";
import ImageComponent from "@/components/ImageComponent";

type Props = {
  params: Promise<{ bookingID: string }>;
};

const page = async ({ params }: Props) => {
  const bookingID = (await params).bookingID;
  const booking = await prisma.booking.findUnique({
    where: {
      bookingID,
    },
    include: {
      car: {
        select: {
          subTitle: true,
          image:true,
          carType: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  });

  if (!booking) notFound();

  const extraOptions = booking.extraOptions as unknown as ExtraOptionsType[];
  return (
    <div>
      <Heading title="Booking Details" />

<div className=" mt-12 flex items-center gap-4">
<h3 className="text-site-primary text-3xl font-semibold">
        #{booking.bookingID}
      </h3>
      <Badge status={booking.status} />
</div>
     <div className="h-[300px] relative mt-3">
     <ImageComponent src={booking.car.image} alt="img" aspect="video"   className="h-full w-full  blur-[3px] absolute top-0 left-0" />
     <ImageComponent src={booking.car.image} alt="img" aspect="video" imgClassName="object-contain" className="h-full w-full  relative" />
     </div>
  
   
    
   
    

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="capitalize font-semibold">car details</h3>
          <div className="w-full mt-2">
            <BookingItem label="Car Name" value={`${booking.car.carType.title} (${booking.car.subTitle})`} />
            <BookingItem
              label="Booking Date"
              value={format(booking.createdAt, "MMM, dd yyyy - HH:mm")}
            />
            <BookingItem
              label="Start Date"
              value={formatDateUtc(booking.startDate)}
            />
            <BookingItem
              label="End Date"
              value={formatDateUtc(booking.endDate)}
            />
          </div>
        </div>

        <div>
          <h3 className="capitalize font-semibold">client details</h3>
          <div className="w-full mt-2">
            <BookingItem
              label="Client Name"
              value={`${booking.firstName} ${booking.middleName} ${booking.lastName}`}
            />
            <BookingItem label="Client Email" value={booking.email} />
            <BookingItem
              label="Client Contact Number"
              value={`${formatPhoneNumber(booking.contactNumber)}`}
            />
          </div>
        </div>

        <div>
          <h3 className="capitalize font-semibold">billing details</h3>
          <div className="w-full mt-2">
            <BookingItem
              label="Billing Name"
              value={`${booking.billingFirstName} ${booking.billingMiddleName} ${booking.billingLastName}`}
            />
            <BookingItem
              label="Billing Contact Number"
              value={`${formatPhoneNumber(booking.billingContactNumber)}`}
            />
               <BookingItem
              label="Billing Address"
              value={`${booking.address}`}
           
            />
             <BookingItem
              label="Billing City"
              value={`${booking.City}`}
           
            />
             <BookingItem
              label="Billing State"
              value={`${booking.State}`}
           
            />
             <BookingItem
              label="Billing Zipcode"
              value={`${booking.Zipcode}`}
           
            />
            {
              booking.companyName &&  <BookingItem
              label="Company Name"
              value={`${booking.companyName}`}
           
            />
            }
            {
              booking.companyVat &&  <BookingItem
              label="Company Name"
              value={`${booking.companyVat}`}
           
            />
            }
          </div>
        </div>

        <div>
          <h3 className="capitalize font-semibold">Payment Details</h3>
          <div className="w-full mt-2">
            <BookingItem label="Payment Method" value={booking.paymentMethod} />
            <BookingItem
              label="Total Amount"
              value={formatToDollar(booking.totalAmount)}
            />
            <BookingItem
              label="Pay Now"
              value={formatToDollar(booking.payNow)}
            />
          </div>
        </div>
        {!!extraOptions.length && (
          <div>
            <h3 className="capitalize font-semibold">Extra Options</h3>
            <div className="w-full mt-2">
              {extraOptions.map((option, index) => (
                <BookingItem
                  key={index}
                  label={option.title}
                  value={formatToDollar(+option.price)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="mt-12 flex flex-col gap-1 w-[100px] items-start">
        {booking.license && <SuperButton download title="License" variant="link" className="text-black" buttonType="linkButton" target="_blank" href={booking.license} />}
        {booking.insurance && <SuperButton download variant="link" title="Insurance" className="text-black" buttonType="linkButton" target="_blank" href={booking.insurance} />}
        {booking.returnFlight && <SuperButton download variant="link" title="Return Flight" className="text-black" buttonType="linkButton" target="_blank" href={booking.returnFlight} />}
      </div>

      <SuperButton title="Back" buttonType="pushButton" href="/bookings" className="mt-12" Icon={<ChevronLeft className="icon" />}/>
    </div>
  );
};

export default page;

const BookingItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col gap-1 mt-3">
      <p className="text-xs capitalize text-[#606060] font-[600] text-[14px]">
        {label}
      </p>
      <p className="border bg-[#F5F6FA] rounded-[4px] px-[17px] py-[12px] font-[400] text-[14px] text-black">
        {value}
      </p>
    </div>
  );
};
