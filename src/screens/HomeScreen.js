import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Screen } from '@components'
import { useApp } from '@app'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import { signout } from '@utils/auth'
import { cleanStorage } from '@utils/storage'

export default props => {
    const { params } = props.route

    const { reset, user } = useApp()
    const { clearModal } = useModal()
    const { notifySocket } = useSocket()

    useEffect(() => {
        if (params) handleSignout()
    }, [params])

    const handleSignout = async () => {
        if (params.signout) await signout(user._id)
        notifySocket('user_signed_out', user._id)
        cleanStorage()
        reset()
        props.navigation.navigate('Home')
        clearModal()
    }

    return (
        <Screen
            {...props}
            secure={false}
            title='Home'
        >
            <View style={{ flex: 1 }}>
                
            </View>

        </Screen>
    )
}