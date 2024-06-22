import React from 'react'
import {
    ScrollView,
    View,
} from 'react-native'

export default ({ children }) => {

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1, paddingVertical: 10 }}
        >
            {children}
        </ScrollView>
    )
}