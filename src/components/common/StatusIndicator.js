import React, { useMemo } from 'react'
import { useApp, useSocket } from '@context'
import Icon from 'react-native-vector-icons/Ionicons'

const StatusIndicator = ({ id, size = 25 }) => {
    
    const { theme } = useApp()
    const { connections } = useSocket()

    const isConnected = useMemo(() => connections.map(c => c.userId).indexOf(id) > -1, [connections])

    return (
        <Icon
            name={isConnected ? 'ellipse' : 'ellipse-outline'}
            size={size}
            color={isConnected ? theme?.colors.statusOn : theme?.colors.statusOff}
        />
    )
}

export default StatusIndicator