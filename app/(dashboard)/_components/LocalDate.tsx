'use client'

import { format } from 'date-fns'
import React from 'react'

type Props = {
    date:Date

}

const LocalDate = ({date}: Props) => {
  return (
    <div>{format(new Date(date), "MMM, dd yyyy - HH:mm")}</div>
  )
}

export default LocalDate