import React from 'react'
import {
    SafeAreaView,
} from 'react-native'
import {
    Label,
    ThemedText,
} from '@components'
import {
    AuthView,
} from '@layout'
import {
    AuthContextProvider,
    FormContextProvider,
    useApp,
} from '@context'
import Compose from '../Compose'

export default () => {
    const context = useApp()
    const { admin, dims, theme } = context

    const renderItems = keysRequired => {
        const keys = Object.keys(context)
        return keys.map((key, index) => {
            if (typeof context[key] !== 'function' && keysRequired.indexOf(key) > -1) {
                // console.log(' ')
                // console.log(key)
                // console.log(context[key])
                return <ThemedText key={`item-${index}`}>{`${key}: ${context[key]}`}</ThemedText>
            }
        })
    }

    return (
        <SafeAreaView
            style={{
                width: dims.width,
                height: dims.height,
                backgroundColor: theme?.colors.background,
            }}
        >
            <Label
                label='App Layer'
                visible={admin}
            >
                {renderItems(['landscape', 'night'])}
            </Label>
            <Compose
                components={[
                    AuthContextProvider,
                    FormContextProvider,
                ]}
            >
                <AuthView />
            </Compose>
        </SafeAreaView>
    )
}