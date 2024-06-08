import React, { useMemo } from 'react'
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
import { getProfileImagePathFromUser } from '@utils/images'
import Icon from 'react-native-vector-icons/Ionicons'
import { ActivityIndicator } from 'react-native-paper'

export default ({ item, onPress, ...props }) => {
    const imagePath = getProfileImagePathFromUser(item)
    const { theme } = useApp()
    const { contacts } = useContacts()
    const contact = useMemo(() => contacts.filter(contact => contact._id === item._id)[0], [contacts])
    if (!contact) return <ActivityIndicator size='small' />
    const isConnected = () => contact && contact.status === 'signed_in'
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
                name={isConnected() ? 'ellipse' : 'ellipse-outline'}
                size={18}
                color={isConnected() ? theme?.colors.statusOn : theme?.colors.statusOff}
            />
            
            <ThemedText>{item.username}</ThemedText>

        </Pressable>
    )
}