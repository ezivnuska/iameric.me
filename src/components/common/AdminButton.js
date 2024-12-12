
import React from 'react'
import { IconButton } from '@components'
import { useUser } from '@context'

const AdminButton = ({
    disabled,
    name,
    onPress,
    size = 24,
    transparent = false,
    ...props
}) => {

    const { user } = useUser()

    return user.role === 'admin' ? (
        <IconButton
            {...props}
            name={name}
            size={size}
            onPress={onPress}
            disabled={disabled}
            color='purple'
            transparent={transparent}
        />
    ) : null
}

export default AdminButton