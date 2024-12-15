import prisma from '@/lib/prisma'
import React from 'react'
import BookingsTable from '../tables/BookingsTable'

type Props = {}

const BookingsFeed = async(props: Props) => {
    const bookings = await prisma.booking.findMany({
        select:{
            bookingID:true,
            createdAt:true,
            firstName:true,
            lastName:true,
            email:true,
            status:true,
            totalAmount:true
        }
    })
  return (
   <BookingsTable bookings={bookings} />
  )
}

export default BookingsFeed