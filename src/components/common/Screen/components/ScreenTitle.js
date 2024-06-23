import React from 'react'
import { ThemedText } from '@components'

export default ({ title }) => {
    return (
        <ThemedText
            bold
            size={18}
            style={{ paddingVertical: 5, marginBottom: 5 }}
        >
            {title}
        </ThemedText>
    )
}