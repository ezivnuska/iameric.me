import React from 'react'
import { IconButton } from 'react-native-paper'
import { useUser } from '@context'

const AddCommentButton = ({ data, onSelection, onUploaded }) => {
    
    const { user } = useUser()

    return (
        <IconButton
            icon='comment-plus'
            // onPress={}
        />
    )
}

export default AddCommentButton