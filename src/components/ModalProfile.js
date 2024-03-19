import React, { useContext } from 'react'
import {
    View,
} from 'react-native'
import {
    UserDetailsShort,
} from '.'
import { AppContext } from '../AppContext'

export default () => {

    const {
        dispatch,
        profile,
    } = useContext(AppContext)
    
    return (
        <View
            style={{
                alignItems: 'center',
            }}
        >
            {profile && (
                <UserDetailsShort
                    userId={profile._id}
                    clear={() => dispatch({ type: 'CLOSE_MODAL' })}
                />
            )}
        </View>
    )
}