import React, { useEffect } from 'react'
import {
    View,
} from 'react-native'
import {
    Label,
    ThemedText,
} from '@components'
import {
    CartContextProvider,
    ContactContextProvider,
    ForumContextProvider,
    ModalContextProvider,
    OrderContextProvider,
    ProductContextProvider,
    useApp,
    useUser,
} from '@context'
import { AppNavigation } from '@navigation'
import Compose from '../Compose'

export default () => {

    const user = useUser()
    const { admin } = useApp()

    useEffect(() => {

    }, [])

    const renderItems = (state, keysRequired) => {
        const keys = Object.keys(state)
        return keys.map((key, index) => {
            if (typeof state[key] !== 'function' && keysRequired.indexOf(key) > -1) {
                // console.log(' ')
                // console.log(key)
                // console.log(state[key])
                return <ThemedText key={`item-${index}`}>{`${key}: ${state[key]}`}</ThemedText>
            }
        })
    }

    return (
        <View>
            <Label
                label='User Layer'
                visible={admin}
            >
                {renderItems(user, ['userLoading'])}
            </Label>
            {/* <Header /> */}
            
            <Compose
                components={[
                    CartContextProvider,
                    ContactContextProvider,
                    ForumContextProvider,
                    ModalContextProvider,
                    OrderContextProvider,
                    ProductContextProvider,
                ]}
            >
                <AppNavigation />
            </Compose>
        </View>
    )
}