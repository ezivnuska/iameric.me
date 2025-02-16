import React from 'react'
import { Text } from 'react-native-paper'
// import {
//     format,
//     formatDistance,
//     formatRelative,
//     subDays,
// } from 'date-fns'
import { getTime } from '@utils/time'

const Time = ({
    time = null,
    size = 16,
    color = '#444',
    prefix = '',
    suffix = '',
    ...props
}) => {
    return (
        <Text variant='bodyMedium' {...props}>
            {time
                ? `${prefix}${getTime(time, 'relative')}${suffix}`
                : 'Now'
            }
        </Text>
    )
}

export default Time
// format(new Date(), "'Today is a' eeee")
// //=> "Today is a Monday"

// formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
//=> "3 days ago"

// formatRelative(subDays(new Date(), 3), new Date())
//=> "last Friday at 7:26 p.m."