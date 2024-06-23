import React, { useEffect } from 'react'
import {
    ScrollView,
    View,
} from 'react-native'
import { ScreenTitle } from './components'
import {
    ThemedText,
} from '@components'
import { useApp } from '@app'

export default ({ children, secure = true, title = null, ...props }) => {

    const {
        token,
    } = useApp()

    useEffect(() => {
        if (secure && !token) {
            console.log(`not authorized for path ${props.route.path}`)
            props.navigation.navigate('Home')
        }
    }, [token])

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <View style={{ flexGrow: 1, paddingBottom: 15 }}>
                
                {title && (
                    <ScreenTitle title={title} />
                    // moved into local ScreenTitle component...
                    // <ThemedText
                    //     bold
                    //     size={18}
                    //     style={{ paddingVertical: 5, marginBottom: 5 }}
                    // >
                    //     {title}
                    // </ThemedText>
                )}
                
                {children}

            </View>
        </ScrollView>
    )
}