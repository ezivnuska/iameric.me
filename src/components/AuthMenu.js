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
import Icon from 'react-native-vector-icons/Ionicons'
import classes from '../styles/classes'

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

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '100%',
            paddingRight: 15,
        }}>

            {(verified && user && !loading) ? (
                <View>
                    {items && items.length ? <CartButton /> : null}

                    <UserButton onPress={onPress} user={user} />
                </View>
            ) : (
                <Pressable
                    onPress={onPress}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',

                    }}
                >
                    <Icon
                        name='log-in-outline'
                        size={24}
                        color='#fff'
                        style={{ marginRight: 5 }}
                    />

                    <Text style={classes.textDefault}>
                        Sign In
                    </Text>
                    
                </Pressable>
            )}
            
        </View>
    )
}