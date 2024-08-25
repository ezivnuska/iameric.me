import React from 'react'
import { View } from 'react-native'
import {
    SimpleButton,
} from '@components'
import { useModal } from '@modal'

export default () => {
    const { closeModal, setNewModal } = useModal()
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >

            <View
                style={{
                    flex: 1,
                    gap: 20,
                }}
            >
                <SimpleButton
                    label='Capture Bip'
                    onPress={() => setNewModal('CAPTURE')}
                />
                <SimpleButton
                    label='Close'
                    onPress={closeModal}
                />
            </View>

        </View>
    )
}