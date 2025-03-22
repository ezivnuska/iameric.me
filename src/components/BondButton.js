import React from 'react'
import { IconButton } from 'react-native-paper'
import { useUser } from '@context'

const BondButton = ({ onPress }) => {
    
    const { user } = useUser()

    return (
        <IconButton
            icon='file-image-plus'
            onPress={onPress}
        />
    )
}

export default BondButton