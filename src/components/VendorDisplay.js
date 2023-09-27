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
            <Heading>{`Restaurants (${vendors.length})`}</Heading>
            <VendorList />
        </View>
    )
}

export default VendorDisplay