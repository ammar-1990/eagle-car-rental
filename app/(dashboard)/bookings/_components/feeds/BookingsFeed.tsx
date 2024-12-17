import prisma from '@/lib/prisma'
import React from 'react'
import BookingsTable from '../tables/BookingsTable'
import { TAKE_BOOKINGS } from '@/lib/Types'

type Props = {
    page:string,
    email:string | undefined
}

const BookingsFeed = async({page,email}: Props) => {
    const pageNumber = Number(page)
    const bookingsRes =  prisma.booking.findMany({
        ...(email && {where:{
            email
        }}),
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

    const bookingsCountRes = prisma.booking.count({
        ...(email && {where:{
            email
        }})
    })

    const [bookings, bookingsCount] =await  Promise.all([bookingsRes, bookingsCountRes])
    console.log("Page::",page)
    console.log("Bookings Count::",bookingsCount)
  return (
   <BookingsTable email={email} bookings={bookings} bookingsCount={bookingsCount} />
  )
}

export default BookingsFeed