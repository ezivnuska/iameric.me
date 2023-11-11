import React, { useContext } from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    CartButton,
} from '.'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'
import layout from '../styles/layout'
import DefaultAvatar from '../images/avatar-default-small.png'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const SettingsButton = ({ label }) => (
    <TouchableOpacity
        onPress={() => navigate('Settings')}
        style={{
            flex: 1,
            flexShrink: 0,
            flexShrink: 1,
            flexBasis: 'auto',
            marginHorizontal: layout.horizontalPadding,
            padding: 5,
        }}
    >
        <Text style={{
            color: '#fff',
            fontWeight: 700,
        }}>
            {label}
        </Text>
    </TouchableOpacity>
)

export default () => {
    
    const {
        cart,
        user,
    } = useContext(AppContext)

    const { items } = cart

    const renderAvatar = () => user.profileImage ? (
        <Image
            style={{
                width: 24,
                height: 24,
                resizeMode: 'stretch',
            }}
            // onLoadStart={() => setLoading(true)}
            // onLoadEnd={() => setLoading(false)}
            source={`${IMAGE_PATH}/${user.username}/${user.profileImage.filename}`}
        />
    ) : (
        <Image
            source={DefaultAvatar}
        />
    )

    return user ? (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '100%',
        }}>

            {items && items.length ? <CartButton /> : null}

            {renderAvatar()}

            <SettingsButton label={user.username} />
        </View>
    ) : null
}