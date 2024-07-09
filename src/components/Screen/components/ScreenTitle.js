import React from 'react'
import { ThemedText } from '@components'

export default ({ title }) => {
    return (
        <ThemedText
            bold
            size={20}
            color='tomato'
            style={{ paddingBottom: 7 }}
        >
            {title}
        </ThemedText>
    )
}