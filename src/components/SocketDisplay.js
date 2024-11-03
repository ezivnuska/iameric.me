import React from 'react'
import { View } from 'react-native'
import { ModalHeader } from '@components'
import { Socket } from '@modules'

const SocketDisplay = () => {
    return (
        <View>
            <ModalHeader title={'Sockets'} />
            <Socket />
        </View>
    )
}

export default SocketDisplay