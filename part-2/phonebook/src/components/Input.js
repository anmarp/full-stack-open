import React from 'react'

const Input = ({ text, value, eventHandler }) => {
    return (
        <div>
            {text}: <input value={value} onChange={eventHandler} />
        </div>
    )
}

export default Input