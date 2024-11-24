import React from 'react'

type Props = {children:React.ReactNode}

const layout = ({children}: Props) => {
  return (
    <div>
        layout
        {children}
    </div>
  )
}

export default layout