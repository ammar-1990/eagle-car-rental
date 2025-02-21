'use client'

import { format } from 'date-fns'
import React from 'react'

type Props = {
    date:Date

}

const LocalDate = ({date}: Props) => {
  return (
    <div>{new Date(date).toLocaleString()}</div>
  )
}

export default LocalDate