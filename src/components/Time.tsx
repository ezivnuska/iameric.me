import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import {
    format,
    formatDistance,
    formatRelative,
    subDays,
} from 'date-fns'

const Time = ({ time = null, color = '#444', prefix = '', suffix = '' }) => {
    return (
        <View>
            <ThemedText color={color} size={16}>
                {time
                    ? `${prefix}${formatRelative(new Date(time), new Date())}${suffix}`
                    : 'Now'
                }
            </ThemedText>
        </View>
    )
}

export default Time
// format(new Date(), "'Today is a' eeee")
// //=> "Today is a Monday"

// formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
//=> "3 days ago"

// formatRelative(subDays(new Date(), 3), new Date())
//=> "last Friday at 7:26 p.m."