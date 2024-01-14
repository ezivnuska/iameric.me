import React, { useContext, useEffect } from 'react'
import {
    OrderModule,
    SecureScreen,
} from '@components'
import { AppContext } from '../AppContext'
// import { CommonActions } from '@react-navigation/native'
// import { navigationRef } from '../navigators/RootNavigation'

export default ({ navigation, route }) => {
    const {
        dispatch,
        // loaded,
    } = useContext(AppContext)

    useEffect(() => {
        // if (route.params) console.log('route.params', route.params)
        // if (route.params && route.params.signout) dispatch({ type: 'SIGNOUT' })
    }, [route])

    return (
        <SecureScreen navigation={navigation}>
            <OrderModule />
        </SecureScreen>
    )
}