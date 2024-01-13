import React from 'react'
import { IconButton } from '.'

export default ({ dirty, valid, label }) => (
    <IconButton
        label={label}
        bgColor={dirty ? 'blue' : 'gray'}
        disabled={!dirty || !valid}
    />
)