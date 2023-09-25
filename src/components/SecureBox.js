import React, { useContext, useEffect } from 'react'
import {
    View,
} from 'react-native'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'

const SecureBox = ({ children }) => {
    
    const {
        dispatch,
        loaded,
        state,
        user,
    } = useContext(AppContext)

    useEffect(() => {
        // if (!user) navigate('Start')
    }, [])

    return (
        <View>
            {children}
        </View>
    )
}

export default SecureBox