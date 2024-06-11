import React, { useEffect, useMemo, useState } from 'react'
import {
    Image,
    Pressable,
} from 'react-native'
import {
    ThemedText,
} from '@components'
import {
    useApp,
} from '@context'
import { getProfileImagePathFromUser } from '@utils/images'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({ item, onPress, ...props }) => {
    let imagePath = getProfileImagePathFromUser(item)
    
    const { connections, theme } = useApp()

    const [ connected, setConnected ] = useState(false)
    const ids = useMemo(() => connections.map(c => c.userId), [connections])

    useEffect(() => {
        const isConnected = ids.indexOf(item._id) > -1
        // if (isConnected) console.log(`user ${item._id} connected`)
        setConnected(isConnected)
    }, [ids])

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
                    paddingBottom: 10,
                },
                props.style,
            ]}
        >
            <Image
                style={{
                    flexBasis: 'auto',
                    flexGrow: 0,
                    width: 50,
                    height: 50,
                    resizeMode: 'center',
                }}
                source={imagePath}
            />

            <Icon
                name={connected ? 'ellipse' : 'ellipse-outline'}
                size={18}
                color={connected ? theme?.colors.statusOn : theme?.colors.statusOff}
            />
            
            <ThemedText>{item.username}</ThemedText>

        </Pressable>
    )
}