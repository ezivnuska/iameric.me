import React, { useContext, useEffect } from 'react'
import { AppContext } from '../AppContext'
import {
    Text,
} from 'react-native'
import {
    CenteredView,
    CustomerHome,
    DriverHome,
    OrderListContainer,
    SecureScreen,
    VendorHome,
} from '@components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { navigate } from '../navigators/RootNavigation'
import { getRoute } from '../utils/storage'

export default () => {

    const {
        user,
    } = useContext(AppContext)

    const renderContent = role => {
        switch (role) {
            case 'customer': return <CustomerHome />; break 
            case 'vendor': return <VendorHome />; break
            case 'driver': return <DriverHome />; break
            default: return null
        }
    }

    return (
        <SecureScreen>

            {/* <CenteredContent>
                <OrderListContainer />
            </CenteredContent> */}

            {/* <CenteredView> */}
                {user && renderContent(user.role)}
            {/* </CenteredView> */}

        </SecureScreen>
    )
}