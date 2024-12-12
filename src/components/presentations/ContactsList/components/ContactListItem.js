import React, { useMemo } from 'react'
import { Pressable, View } from 'react-native'
import { ProfileImage, TextCopy } from '@components'
import { useApp, useModal, useSocket } from '@context'
import Icon from 'react-native-vector-icons/Ionicons'

const ContactListItem = ({ item, onPress, ...props }) => {
    
    const { theme } = useApp()
    const { setModal } = useModal()
    const { connections } = useSocket()

    const isConnected = useMemo(() => {
        const connectedIds = connections.map(c => c.userId)
        return connectedIds.indexOf(item._id) > -1 
    }, [connections])

    return (
        <View
            {...props}
            key={`contact-${item._id}`}
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Pressable
                // onPress={() => navigate('User', { username: item.username })}
                onPress={() => onPress(item.username)}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexGrow: 1,
                    flexShrink: 0,
                    gap: 10,
                }}
            >
                <ProfileImage
                    user={item}
                    size={50}
                />

                <Icon
                    name={isConnected ? 'ellipse' : 'ellipse-outline'}
                    size={30}
                    color={isConnected ? theme?.colors.statusOn : theme?.colors.statusOff}
                />

                {/* {item.userId && item.available && (
                    <Icon
                        name={'move-outline'}
                        size={18}
                        color={theme?.colors.textDefault}
                    />
                )} */}
                
                <TextCopy
                    size={24}
                    bold={isConnected}
                    style={{ lineHeight: 50 }}
                >
                    {item.username || `Guest-${String(item.socketId).substring(item.socketId.length - 3)}`}
                </TextCopy>

            </Pressable>

            {/* <IconButton
                name='mail-outline'
                onPress={() => setModal('MESSAGE', item)}
            /> */}
        </View>
    )
}

export default ContactListItem