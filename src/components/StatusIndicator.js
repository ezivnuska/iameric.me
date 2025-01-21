import React, { useMemo } from 'react'
import { useTheme, useSocket } from '@context'
import Icon from 'react-native-vector-icons/Ionicons'

const StatusIndicator = ({ id, size = 20 }) => {
    
    const { theme } = useTheme()
    const { connections } = useSocket()

    const isConnected = useMemo(() => connections.map(c => c.userId).indexOf(id) > -1, [connections])

    return (
        <Icon
            name='flash-sharp'
            // name={`flash-${isConnected ? 'sharp' : 'outline'}`}
            size={size}
            color={isConnected ? theme?.colors.statusOn : theme?.colors.statusOff}
            style={{ visibility: isConnected ? 'visible' : 'hidden' }}
        />
    )
}

export default StatusIndicator