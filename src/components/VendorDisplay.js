import React, { useContext, useEffect } from 'react'
import {
    Text,
    View,
} from 'react-native'
import {
    CenteredView,
    Heading,
    VendorList,
} from '.'
import { AppContext } from '../AppContext'
import main from '../styles/main'

const VendorDisplay = () => {

    const {
        vendors,
    } = useContext(AppContext)

    return vendors && vendors.length ? (
        <View>
            <Heading>{`Restaurants (${vendors.length})`}</Heading>
            <VendorList />
        </View>
    ) : (
        <CenteredView>
            <Text>No Available Vendors</Text>
        </CenteredView>
    )
}

export default VendorDisplay