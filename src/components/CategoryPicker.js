import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'

const CategoryPicker = ({ onChange }) => {

    const [category, setCategory] = useState(null)
    
    useEffect(() => {
        if (category) onChange(category)
    }, [category])
    
    return (
        <Picker
            value=''
            selectedValue={category}
            onValueChange={(value, index) => setCategory(value)}
        >
            <Picker.Item label='Main' value='main' />
            <Picker.Item label='Sides' value='vendor' />
            <Picker.Item label='Desserts' value='deserts' />
            <Picker.Item label='Drinks' value='beverages' />
        </Picker>
    )
}

export default CategoryPicker