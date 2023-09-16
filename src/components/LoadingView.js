import React from 'react'
import {
    ActivityIndicator,
    Text,
    View,
} from 'react-native'
import { CenteredView, DefaultText } from '.'
import main from '../styles/main'

const LoadingView = ({ label = null }) => (
    <CenteredView>
        <View>
            <ActivityIndicator size='large' />
            {label && <Text style={main.text}>{label}</Text>}
        </View>
    </CenteredView>
)

export default LoadingView