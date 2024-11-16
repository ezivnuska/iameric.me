import React, { useMemo } from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    IconButton,
    ThemedText,
} from '@components'
import { useApp } from '@app'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import Icon from 'react-native-vector-icons/Ionicons'
import { navigate } from '@utils/navigation'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const ContactListItem = ({ item }) => {
    
    const { theme } = useApp()
    const { setModal } = useModal()
    const { connections } = useSocket()

    const getProfileImagePathFromUser = user => {
        return user.profileImage
            ? `${IMAGE_PATH}/${user.username}/${user.profileImage.filename}`
            : `${IMAGE_PATH}/avatar-default-small.png`}

    const imagePath = useMemo(() => getProfileImagePathFromUser(item), [item])

    const isConnected = useMemo(() => {
        const connectedIds = connections.map(c => c.userId)
        return connectedIds.indexOf(item._id) > -1 
    }, [connections])

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Pressable
                disabled
                onPress={() => navigate('Contact', { screen: 'Details', params: { username: item.username } })}
                style={[
                    {
                        flexBasis: 'auto',
                        flexGrow: 0,
                        flexShrink: 0,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 10,
                        flexWrap: 'nowrap',
                        paddingVertical: 5,
                    },
                    // props.style,
                ]}
            >
                <View
                    style={{
                        flexGrow: 0,
                        borderRadius: 12,
                        height: 24,
                        overflow: 'hidden',
                        borderWidth: 1,
                        borderColor: '#777',
                    }}
                >
                    <Image
                        resizeMode='cover'
                        style={{
                            width: 24,
                            height: 24,
                        }}
                        source={imagePath}
                    />
                </View>

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

            {/* <IconButton
                name='mail-outline'
                onPress={() => setModal('MESSAGE', item)}
            /> */}
        </View>
    )
}

export default ContactListItem