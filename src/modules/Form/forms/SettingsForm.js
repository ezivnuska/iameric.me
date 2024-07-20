import React from'react'
import { View } from'react-native'
import { FormHeader } from './components'
import {
    Heading,
    SimpleButton,
} from '@components'
import { useApp } from '@app'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import { signout } from '@utils/auth'
import { cleanStorage } from '@utils/storage'

export default () => {
    const { reset, user } = useApp()
    const { setModal } = useModal()
    const { notifySocket } = useSocket()
    
    const handleSignout = async () => {
        await signout(user._id)
        notifySocket('user_signed_out', user._id)
        cleanStorage()
        reset()
    }
    return (
        <View style={{ flex: 1 }}>
            
            <FormHeader title='Settings' />

            <View style={{ flexGrow: 1 }}>
                <Heading title='Sign Out' />
                <SimpleButton
                    label={'Sign Out'}
                    onPress={() => handleSignout()}
                />
            </View>

            <View style={{ flexGrow: 0, marginBottom: 100 }}>
                <Heading title='Close Account' />
                <SimpleButton
                    label='Close Account'
                    onPress={() => setModal('DESTROY')}
                />
            </View>
            
        </View>
    )
}