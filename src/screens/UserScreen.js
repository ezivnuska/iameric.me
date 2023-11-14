import React, { useContext, useEffect } from 'react'
import { AppContext } from '../AppContext'
import {
    CenteredContent,
    OrderListContainer,
    ProductDisplay,
    Screen,
    VendorDisplay,
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
            navigate(route)
        }
    }

    return (
        <Screen>

            <CenteredContent>
                <OrderListContainer />
            </CenteredContent>

            {
            user.role === 'customer'
            ?
            (<CenteredContent>
                <VendorDisplay />
            </CenteredContent>)
            :
            user.role === 'vendor'
            ?
            (<CenteredContent>
                <ProductDisplay />
            </CenteredContent>)
            :
            null
            }

        </Screen>
    )
}