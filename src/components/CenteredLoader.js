import React from 'react'
import {
    ActivityIndicator,
} from 'react-native'
import {
    CenteredView
} from '.'

const CenteredLoader = () => (
    <CenteredView>
        <ActivityIndicator size='large' />
    </CenteredView>
)

export default CenteredLoader
