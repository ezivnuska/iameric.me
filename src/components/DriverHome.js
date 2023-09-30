import React from 'react'
import {
    Text,
    View,
} from 'react-native'
import main from '../styles/main'

const DriverHome = () => (
    <View>
        <Text style={main.text}>No available orders.</Text>
        <Text style={main.text}>Check back later.</Text>
    </View>
)

export default DriverHome