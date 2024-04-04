import React, { useState } from 'react'

export const useFormInput = ({ initialValue, ...props }) => {
    const [value, setValue] = useState(initialValue)
    
    const handleChange = e => {
        setValue(e.target.value)
    }

    const handleReset = () => {
        setValue('')
    }

    return {
        value,
        onChange: handleChange,
        onReset: handleReset,
        ...props,
    }
}