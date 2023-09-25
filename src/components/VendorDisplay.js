import React, { useContext, useEffect } from 'react'
import {
    Text,
    View,
} from 'react-native'
import {
    Heading,
    PanelView,
    VendorList,
} from '.'
import { AppContext } from '../AppContext'
import main from '../styles/main'

const VendorDisplay = () => {

    const {
        vendors,
    } = useContext(AppContext)

    return (
        <View>
            <Heading style={main.padded}>{`Restaurants (${vendors.length})`}</Heading>
            <PanelView type='expanded'>
                <VendorList />
            </PanelView>
        </View>
    )
}

export default VendorDisplay