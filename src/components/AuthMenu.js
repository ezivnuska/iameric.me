import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    Avatar,
    CartButton,
    CloseButton,
} from '.'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'
import layout from '../styles/layout'
import { getImageDataById } from '../Data'

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
const AuthMenu = () => {
    
    const {
        dispatch,
        cart,
        user,
    } = useContext(AppContext)

    const { items } = cart

    const fetchImageData = async id => {
        const imageData = await getImageDataById(id)
        dispatch({ type: 'SET_PROFILE_IMAGE', profileImage: imageData })
    }

    useEffect(() => {
        if (user && user.profileImage && !user.profileImage.filename) {
            fetchImageData(user.profileImage)
        }
    }, [user])

    const renderAvatar = () => (
        <Image
            style={{
                width: 24,
                height: 24,
                resizeMode: 'stretch',
            }}
            // onLoadStart={() => setLoading(true)}
            // onLoadEnd={() => setLoading(false)}
            source={
                (user.profileImage && user.profileImage.filename)
                ? `${IMAGE_PATH}/${user.username}/${user.profileImage.filename}`
                : `${IMAGE_PATH}/avatar-default-small.png`
            }
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

export default AuthMenu