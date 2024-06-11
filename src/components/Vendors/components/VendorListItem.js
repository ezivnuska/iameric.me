import React, { useEffect, useMemo, useState } from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    ThemedText,
} from '@components'
import {
    useApp,
    useContacts,
} from '@context'
import { classes } from '@styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { ActivityIndicator } from 'react-native-paper'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ children, user, filename, onPress = null, ...props }) => {

    const { connections, landscape, profile, theme } = useApp()
    const [ connected, setConnected ] = useState(false)
    const ids = useMemo(() => connections.map(c => c.userId), [connections])

    useEffect(() => {
        const isConnected = ids.indexOf(user._id) > -1
        // if (isConnected) console.log(`user ${user._id} connected`)
        setConnected(isConnected)
    }, [ids])

    const getSource = () => filename
        ? `${IMAGE_PATH}/${user.username}/${filename}`
        : `${IMAGE_PATH}/avatar-default-small.png`

    return (    
        <Pressable
            disabled={!onPress}
            onPress={onPress}
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
                // onLoadStart={() => setLoading(true)}
                // onLoadEnd={() => setLoading(false)}
                source={getSource()}
            />
            
            <Icon
                name={connected ? 'ellipse' : 'ellipse-outline'}
                size={18}
                color={connected ? theme?.colors.statusOn : theme?.colors.statusOff}
            />

            <ThemedText>{user.username}</ThemedText>

        </Pressable>
    )
}