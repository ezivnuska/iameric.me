import React, { useContext } from 'react'
import {
    Text,
    View,
} from 'react-native'
import { AppContext } from '../AppContext'

export default ({ label = null }) => {

    const {
        loading,
    } = useContext(AppContext)

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}
        >

            <Text
                style={{
                    color: '#fff',
                }}
            >
                {label || loading || 'Loading...'}
            </Text>

        </View>
    )
}