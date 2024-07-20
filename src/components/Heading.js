import React from 'react'
import { ThemedText } from '@components'

export default ({ title }) => (
    <ThemedText
        bold
        size={18}
        color='tomato'
        style={{ marginBottom: 10 }}
    >
        {title}
    </ThemedText>
)