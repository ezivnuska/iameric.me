import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

export default ({ time }) => {
    return (
        <View>
            <ThemedText color='#aaa'>
                {formatRelative(new Date(time), new Date())}
            </ThemedText>
        </View>
    )
}
// format(new Date(), "'Today is a' eeee")
// //=> "Today is a Monday"

// formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
//=> "3 days ago"

// formatRelative(subDays(new Date(), 3), new Date())
//=> "last Friday at 7:26 p.m."