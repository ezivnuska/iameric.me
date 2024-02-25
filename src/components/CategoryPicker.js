import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import {
    View,
} from 'react-native'
import {
    ThemedText,
} from '.'
import { useTheme } from 'react-native-paper'
import classes from '../styles/classes'

export default ({ label, onChange, category = 'main', disabled = null }) => {

    const theme = useTheme()

    return (
        <View>
            <ThemedText
                style={[
                    classes.formInputLabel,
                    { color: theme?.colors.textDefault }
                ]}
            >
                {label}
            </ThemedText>
    
            <Picker
                value={category}
                style={{ fontSize: 18, padding: 5 }}
                selectedValue={category}
                onValueChange={(value, index) => onChange(value)}
                itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily: "Ebrima", fontSize: 17 }}
                enabled={!disabled}
            >
                <Picker.Item label='Main' value='main' />
                <Picker.Item label='Sides' value='sides' />
                <Picker.Item label='Desserts' value='deserts' />
                <Picker.Item label='Drinks' value='beverages' />
            </Picker>
        </View>
    )
}