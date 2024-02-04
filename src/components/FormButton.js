import React from 'react'
import { IconButton } from '.'

export default ({ dirty, valid, label }) => (
    <IconButton
        type='primary'
        label={label}
        disabled={!dirty || !valid}
    />
)