import React from 'react'
import {
    ActivityIndicator,
    Text,
    View,
} from 'react-native'
import {
    CenteredView,
} from '.'
import main from '../styles/main'

const LoadingView = ({ label = null, showActivity = null }) => (
    <CenteredView>
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
    </CenteredView>
)

export default LoadingView