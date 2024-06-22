import React from 'react'
import {
    ScrollView,
    View,
} from 'react-native'
import { ThemedText } from '@components'

export default ({ children, title = null }) => {

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            // contentContainerStyle={{
            //     flexGrow: 1,
            // }}
        >
            <View style={{ flex: 1, paddingBottom: 70 }}>
                {title && <ThemedText bold style={{ fontSize: 18, paddingVertical: 5, marginBottom: 5 }}>{title}</ThemedText>}
                {children}
            </View>
        </ScrollView>
    )
}