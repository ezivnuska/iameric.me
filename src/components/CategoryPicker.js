import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import {
    Text,
    View,
} from 'react-native'
import defaultStyles from '../styles/main'

const CategoryPicker = ({ label, onChange, initialCategory = 'main', disabled = null }) => {

    const [category, setCategory] = useState(initialCategory)
    
    useEffect(() => {
        if (category) onChange(category || 'main')
    }, [category])
    
    return (
        <View>
            <Text style={defaultStyles.label}>{label}</Text>
            <Picker
                value=''
                style={{ fontSize: 18, padding: 5 }}
                selectedValue={category}
                onValueChange={(value, index) => setCategory(value)}
                itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily: "Ebrima", fontSize: 17 }}
                enabled={!disabled}
            >
                <Picker.Item label='Main' value='main' />
                <Picker.Item label='Sides' value='vendor' />
                <Picker.Item label='Desserts' value='deserts' />
                <Picker.Item label='Drinks' value='beverages' />
            </Picker>
        </View>
    )
}

export default CategoryPicker