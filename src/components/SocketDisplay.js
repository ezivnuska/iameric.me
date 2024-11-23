import React from 'react'
import { View } from 'react-native'
import { ModalHeader } from '@components'
import { Socket } from '@modules'
import { useModal } from '@modal'

const SocketDisplay = () => {
    const { closeModal } = useModal()
    return (
        <View>
            {/* <ModalHeader
                title={'Sockets'}
                onClose={closeModal}
            /> */}
            <Socket />
        </View>
    )
}

export default SocketDisplay