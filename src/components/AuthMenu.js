import React, { useContext, useEffect, useState } from 'react'
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
import layout from '../styles/layout'
import DefaultAvatar from '../images/avatar-default-small.png'
import { DownOutlined } from '@ant-design/icons'
import axios from 'axios'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const Button = ({ label, onPress, children = null }) => (
    <Pressable
        onPress={onPress}
        style={{
            flex: 1,
            flexGrow: 0,
            flexShrink: 0,
            flexBasis: 'auto',
            marginHorizontal: 10,
            // padding: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }}
    >
        {children}

        <Text style={{
            color: '#fff',
            fontWeight: 700,
            lineHeight: 32,
        }}>
            {label}
        </Text>
    </Pressable>
)

const UserButton = ({ onPress, user }) => {
    
    const getSource = () => user.profileImage
        ? `${IMAGE_PATH}/${user.username}/${user.profileImage.filename}`
        : `${IMAGE_PATH}/avatar-default-small.png`
    
    return (
        <Pressable
            onPress={onPress}
            style={{
                flex: 1,
                flexGrow: 0,
                flexShrink: 0,
                flexBasis: 'auto',
                marginLeft: 5,
                // padding: 5,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <Image
                style={{
                    width: 24,
                    height: 24,
                    resizeMode: 'stretch',
                    marginRight: 9,
                }}
                // onLoadStart={() => setLoading(true)}
                // onLoadEnd={() => setLoading(false)}
                source={getSource()}
            />
    
            <Text style={{
                color: '#fff',
                fontWeight: 700,
                lineHeight: 32,
            }}>
                {user.username}
            </Text>
    
            <DownOutlined style={{ color: '#fff', marginLeft: 7 }} />
        </Pressable>
    )
}

export default ({ onPress }) => {
    
    const {
        cart,
        loading,
        user,
        verified,
    } = useContext(AppContext)

    const { items } = cart

    return (verified && user && !loading) ? (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '100%',
            paddingRight: 15,
        }}>

            {items && items.length ? <CartButton /> : null}

            {/* <ForumButton /> */}

            <UserButton onPress={onPress} user={user} />

        </View>
    ) : null
}

const ForumButton = () => {

    const [numUsers, setNumUsers] = useState(null)

    useEffect(() => {
        getOnlineUserCount()
    }, [])

    const getOnlineUserCount = async () => {
        const { data } = await axios.get('/api/users/online')
        if (!data) {
            console.log('could not get user count')
            return
        }
        setNumUsers(data.userCount)
    }

    return (
        <Button
            label={`Forum • ${numUsers ? numUsers : '1'}`}
            onPress={() => navigate('Forum')}
            style={{ marginHorizontal: 5 }}
        />
    )
}