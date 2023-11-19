import React, { useContext, useEffect } from 'react'
import { AppContext } from '../AppContext'
import {
    CenteredContent,
    CustomerHome,
    DriverHome,
    OrderListContainer,
    Screen,
    VendorHome,
} from '../components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { navigate } from '../navigators/RootNavigation'

export default ({ navigation, route }) => {

    const {
        user,
    } = useContext(AppContext)

    useEffect(() => {
        checkRoute()
    }, [])

    const checkRoute = async () => {

        const route = await AsyncStorage.getItem('route')
        const detail = await AsyncStorage.getItem('detail')

        if (route) {
            if (detail) navigate(route, { id: detail })
            else navigate(route)
        }
    }

    const renderContent = role => {
        switch (role) {
            case 'customer': return <CustomerHome />; break 
            case 'vendor': return <VendorHome />; break
            case 'driver': return <DriverHome />; break
            default: return null
        }
    }

    return (
        <Screen>

            <CenteredContent>
                <OrderListContainer />
            </CenteredContent>

            <CenteredContent>
                {renderContent(user.role)}
            </CenteredContent>

        </Screen>
    )
}