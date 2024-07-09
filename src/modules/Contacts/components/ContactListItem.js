import React, { useEffect, useMemo, useState } from 'react'
import {
    Image,
    Pressable,
} from 'react-native'
import { ThemedText } from '@components'
import { useApp } from '@app'
// import { getProfileImagePathFromUser } from '@utils/images'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSocket } from '@socket'

export default ({ item, onPress, ...props }) => {
    // let imagePath = getProfileImagePathFromUser(item)
    
    const { theme } = useApp()
    const { connections } = useSocket()

    const isConnected = useMemo(() => {
        const connectedIds = connections.map(c => c.userId)
        return connectedIds.indexOf(item._id) > -1 
    }, [connections])

    return (
        <Pressable
            onPress={() => onPress(item)}
            style={[
                {
                    flexBasis: 'auto',
                    flexGrow: 1,
                    flexShrink: 0,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: 12,
                    flexWrap: 'nowrap',
                    paddingVertical: 5,
                },
                props.style,
            ]}
        >
            {/* <Image
                style={{
                    flexBasis: 'auto',
                    flexGrow: 0,
                    width: 50,
                    height: 50,
                    resizeMode: 'center',
                }}
                source={imagePath}
            /> */}

            <Icon
                name={isConnected ? 'ellipse' : 'ellipse-outline'}
                size={18}
                color={isConnected ? theme?.colors.statusOn : theme?.colors.statusOff}
            />

            {/* {item.userId && item.available && (
                <Icon
                    name={'move-outline'}
                    size={18}
                    color={theme?.colors.textDefault}
                />
            )} */}
            
            <ThemedText>{item.username || `Guest-${String(item.socketId).substring(item.socketId.length - 3)}`}</ThemedText>

        </Pressable>
    )
}