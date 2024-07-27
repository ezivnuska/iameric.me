import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Screen } from './components'
import { useApp } from '@app'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import { signout } from '@utils/auth'
import { cleanStorage } from '@utils/storage'
import { Map, Resume } from '@modules'

export default props => {
    const { params } = props.route

    const { reset, user } = useApp()
    const { clearModal } = useModal()
    const { notifySocket } = useSocket()

    useEffect(() => {
        if (params) handleSignout()
    }, [params])

    const handleSignout = async () => {
        const userId = user._id
        if (params.signout) await signout(userId)
            notifySocket('user_signed_out', userId)
        cleanStorage()
        reset()
        props.navigation.navigate('Home')
        clearModal()
    }

    return (
        <Screen
            {...props}
            secure={false}
        >
            <View
                style={{
                    flex: 1,
                    height: '100vh',
                    width: '100%',
                }}
            >
                <Map />
            </View>

        </Screen>
    )
}