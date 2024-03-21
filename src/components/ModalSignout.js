import React, { useContext } from 'react'
import {
    View,
} from 'react-native'
import {
    IconButton,
} from '.'
import { AppContext } from '../AppContext'
import { signout } from '../utils/auth'
import { navigationRef } from 'src/navigation/RootNavigation'

export default () => {

    const {
        dispatch,
        loading,
        user,
    } = useContext(AppContext)

    const initSignout = async () => {
        
        await signout(dispatch, user._id)
        
        dispatch({ type: 'CLOSE_MODAL' })
    }
    
    return (
        <View
            style={{
                marginHorizontal: 10,
            }}
        >
            <IconButton
                type='primary'
                label='Sign Out'
                onPress={initSignout}
                disabled={loading}
            />
        </View>
    )
}