import React from 'react'
import {
    View,
} from 'react-native'
import {
    ThemedText,
} from '@components'
import { useSocket } from '../SocketContext'
import { useApp } from '@app'

export default () => {
    const { theme } = useApp()
    const {
        connected,
        connections,
    } = useSocket()

    const getShorty = name => {
        let shortName = name
        if (shortName.length > 14) shortName = String(shortName).substring(0, 14)
        return `${shortName}...`
    }
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 12,
                paddingVertical: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: theme?.colors.border,
                gap: 20,
            }}
        >
            <View
                style={{
                    gap: 5,
                    flexGrow: 1,
                }}
            >
                <ThemedText
                    bold
                    size={18}
                >
                    Sockets: {connections.length}
                </ThemedText>
            </View>

            <View
                style={{
                    gap: 7,
                    flexGrow: 1,
                    paddingBottom: 20,
                }}
            >
                {connections && connections.map((name, key) => (
                    <ThemedText
                        key={key}
                        color={name === connected ? '#0f0' : theme?.colors.textDefault}
                        bold={name === connected ? true : false}
                        size={16}
                    >
                        {/* {getShorty(name)} */}
                        {name}
                    </ThemedText>
                ))}
            </View>
        </View>
    )
}