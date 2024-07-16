import React from 'react'
import { View } from 'react-native'
import { ModalHeader } from '.'
import { Socket } from '@modules'

export default () => {
    return (
        <View>
            <ModalHeader title={'Sockets'} />
            <Socket />
        </View>
    )
}