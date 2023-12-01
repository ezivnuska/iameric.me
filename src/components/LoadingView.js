import React from 'react'
import {
    ActivityIndicator,
    Text,
    View,
} from 'react-native'
import main from '../styles/main'

export default ({ label = null, showActivity = null }) => (
    <View>
        {showActivity ? (
            <ActivityIndicator
                size='large'
                style={{
                    marginVertical: 35,
                }}
            />
        ) : null}
        {label && <Text style={main.text}>{label}</Text>}
    </View>
)