import React, { useContext, useEffect } from 'react'
import {
    View,
} from 'react-native'
import { AppContext } from '../AppContext'
import { navigate } from '@navigators/RootNavigation'

export default ({ children }) => {

    const {
        dims,
        user,
    } = useContext(AppContext)

    // useEffect(() => {
    //     console.log('secure screen init:', secure)
    // }, [])

    useEffect(() => {
        if (!user) {
            console.log('Secure Screen. Not secure. Need to go home.')
            navigate('Start')
        }
    }, [user])

    return (
        <View style={{
            height: dims.window.height - 50,
            width: dims.window.width,//'100%',
            minWidth: 375,
            marginHorizontal: 'auto',
        }}>
            {user ? children : null}
        </View>
    )
}