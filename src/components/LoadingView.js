import React from 'react'
import {
    ActivityIndicator,
    Text,
    View,
} from 'react-native'
// import main from '../styles/main'

export default ({ label = null, showActivity = null }) => (
    <View
        style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
        }}
    >
        {showActivity ? (
            <ActivityIndicator
                size='small'
            />
        ) : null}

        {label ? (
            <Text
                style={{
                    color: '#fff',
                }}
            >
                {label}
            </Text>
        ) : null}

    </View>
)