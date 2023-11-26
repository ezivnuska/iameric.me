import React, { useContext } from 'react'
import {
    Image,
    Pressable,
    Text,
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

const Button = ({ label, onPress, children = null }) => (
    <Pressable
        onPress={onPress}
        style={{
            flex: 1,
            flexGrow: 0,
            flexShrink: 0,
            flexBasis: 'auto',
            marginLeft: layout.horizontalPadding,
            padding: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }}
    >
        {children}

        <Text style={{
            color: '#fff',
            fontWeight: 700,
        }}>
            {label}
        </Text>
    </Pressable>
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
                marginRight: 10,
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

            <Button
                label='Forum'
                onPress={() => navigate('Forum')}
            />

            {items && items.length ? <CartButton /> : null}

            <Button
                label={user.username}
                onPress={() => navigate('Settings')}
            >
                {renderAvatar()}
            </Button>    

        </View>
    ) : null
}