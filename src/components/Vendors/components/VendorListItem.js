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
import Icon from 'react-native-vector-icons/Ionicons'
import { ActivityIndicator } from 'react-native-paper'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ children, user, filename, onPress = null, ...props }) => {

    const { landscape, profile, theme } = useApp()

    const { contacts } = useContacts()

    const vendor = useMemo(() => contacts.filter(contact => contact._id === user._id)[0], [contacts])
    
    const getSource = () => filename
        ? `${IMAGE_PATH}/${user.username}/${filename}`
        : `${IMAGE_PATH}/avatar-default-small.png`

    if (!vendor) return <ActivityIndicator size='small' />

    const isConnected = () => (vendor && vendor.status === 'signed_in') || (profile && vendor._id === profile._id)

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
                name={isConnected() ? 'ellipse' : 'ellipse-outline'}
                size={18}
                color={isConnected() ? theme?.colors.statusOn : theme?.colors.statusOff}
            />

            <ThemedText>{vendor.username}</ThemedText>

        </Pressable>
    )
}