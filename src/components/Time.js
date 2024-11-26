import React from 'react'
import { DefaultText } from '@components'
import {
    format,
    formatDistance,
    formatRelative,
    subDays,
} from 'date-fns'

const Time = ({
    time = null,
    size = 16,
    color = '#444',
    prefix = '',
    suffix = '',
    ...props
}) => {
    return (
        <DefaultText
            color={color}
            size={size}
            style={props.style}
        >
            {time
                ? `${prefix}${formatRelative(new Date(time), new Date())}${suffix}`
                : 'Now'
            }
        </DefaultText>
    )
}

export default Time
// format(new Date(), "'Today is a' eeee")
// //=> "Today is a Monday"

// formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
//=> "3 days ago"

// formatRelative(subDays(new Date(), 3), new Date())
//=> "last Friday at 7:26 p.m."