import React from 'react'
import {
    Text,
} from 'react-native'
import {
    PanelView,
} from '.'
import main from '../styles/main'

const DriverHome = () => (
    <PanelView>
        <Text style={main.text}>No available orders.</Text>
        <Text style={main.text}>Check back later.</Text>
    </PanelView>
)

export default DriverHome