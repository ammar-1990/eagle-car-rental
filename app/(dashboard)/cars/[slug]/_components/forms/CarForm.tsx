'use client'

import { Car, CarType } from "@prisma/client"

type Props = {
    car:Car | null,
    carTypes:CarType[]
}

const CarForm = ({car,carTypes}: Props) => {
  return (
    <div>CarForm</div>
  )
}

export default CarForm