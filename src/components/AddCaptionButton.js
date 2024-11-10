import React from 'react'
import { IconButton } from '@components'

const AddCaptionButton = ({ disabled, onPress }) => (
    <IconButton
        name='create-outline'
        onPress={onPress}
        disabled={disabled}
        size={20}
    />
)

export default AddCaptionButton