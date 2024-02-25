import React, { useContext } from 'react'
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
        <IconButton
            type='primary'
            label='Sign Out'
            onPress={initSignout}
            disabled={loading}
        />
    )
}