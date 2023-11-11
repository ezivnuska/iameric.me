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

const AuthMenu = () => {
    
    const {
        dispatch,
        cart,
        user,
        profileImage,
    } = useContext(AppContext)

    const { items } = cart

    const [ avatar, setAvatar ] = useState(null)

    const fetchImageData = async id => {
        console.log('auth menu getting image data...')
        
        const { data } = await axios
            .get(`/api/image/${id}`)
        
        setAvatar(data)
        
        dispatch({ type: 'SET_PROFILE_IMAGE', profileImage: data })
    }

    useEffect(() => {
        if (profileImage) {
            console.log('profileImage', profileImage)
            if (!avatar || avatar._id !== profileImage._id)
                setAvatar(profileImage)
        } else {
            if (user && user.profileImage && typeof user.profileImage === 'string')  {
                fetchImageData(user.profileImage)
            }
        }
        
    }, [profileImage])

    const renderAvatar = () => profileImage ? (
        <Image
            style={{
                width: 24,
                height: 24,
                resizeMode: 'stretch',
            }}
            // onLoadStart={() => setLoading(true)}
            // onLoadEnd={() => setLoading(false)}
            source={`${IMAGE_PATH}/${user.username}/${profileImage.filename}`}
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

export default AuthMenu