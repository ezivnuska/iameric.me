import React, { useContext } from 'react'
import {
    ActivityIndicator,
    Text,
    View,
} from 'react-native'
// import main from '../styles/main'
import { AppContext } from '../AppContext'

export default () => {

    const {
        loading,
    } = useContext(AppContext)

    return loading ? (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}
        >
            {/* <ActivityIndicator
                size='small'
            /> */}

            <Text
                style={{
                    color: '#fff',
                }}
            >
                {loading}
            </Text>

        </View>
    ) : null
}