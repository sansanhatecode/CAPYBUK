import React from 'react'

const Button = (color: string, width: string) => {
  return (
    <button className={`c-` + color + `w-` + width}>Button</button>
  )
}

export default Button