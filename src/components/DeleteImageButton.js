import React from 'react'
import { IconButton } from 'react-native-paper'
import { useUser } from '@context'

const DeleteImageButton = ({ onDelete }) => {
    
    const { user } = useUser()

    return (
        <IconButton
            icon='file-image-minus'
            onPress={onDelete}
        />
    )
}

export default DeleteImageButton