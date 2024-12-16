import prisma from '@/lib/prisma'
import React from 'react'
import BookingsTable from '../tables/BookingsTable'
import { TAKE_BOOKINGS } from '@/lib/Types'

type Props = {
    page:string
}

const BookingsFeed = async({page}: Props) => {
    const pageNumber = Number(page)
    const bookingsRes =  prisma.booking.findMany({
        select:{
            bookingID:true,
            createdAt:true,
            firstName:true,
            lastName:true,
            email:true,
            status:true,
            totalAmount:true
        },
        take:TAKE_BOOKINGS,
        skip:(pageNumber - 1) * TAKE_BOOKINGS,
        orderBy:{
            createdAt:'desc'
        }
    })

    const bookingsCountRes = prisma.booking.count()

    const [bookings, bookingsCount] =await  Promise.all([bookingsRes, bookingsCountRes])
    console.log("Page::",page)
    console.log("Bookings Count::",bookingsCount)
  return (
   <BookingsTable page={page} bookings={bookings} bookingsCount={bookingsCount} />
  )
}

export default BookingsFeed