import React from 'react'
import {
    ActivityIndicator,
    Text,
} from 'react-native'
import {
    CenteredView
} from '.'
import defaultStyles from '../styles'

const CenteredLoader = ({ label = null }) => (
    <CenteredView>
        {label && <Text style={[defaultStyles.subheading, { marginBottom: 20 }]}>{label}</Text>}
        <ActivityIndicator size='large' />
    </CenteredView>
)

export default CenteredLoader
