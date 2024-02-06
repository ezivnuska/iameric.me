import React from 'react'
import {
    ThemedText,
} from '@components'
import classes from '../styles/classes'

export default ({ title }) => (
    <ThemedText style={classes.pageTitle}>
        {title}
    </ThemedText>
)