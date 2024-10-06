import React from 'react'
import { View } from 'react-native'
import { Resume } from './components'
import { Heading } from '@components'

export default () => (
    <View>
        <Heading title='Work' />
        <Resume />
    </View>
)