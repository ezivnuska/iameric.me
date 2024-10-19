import React from 'react'
import { View } from 'react-native'
import { ModalHeader } from '@components'
import { Socket } from '@modules'

export default () => {
    return (
        <View>
            <ModalHeader title={'@sockets'} />
            <Socket />
        </View>
    )
}