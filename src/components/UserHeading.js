import React, { useEffect, useState } from 'react'
import {
    Image,
    Pressable,
    Text,
    View,
} from 'react-native'
import main from '../styles/main'
import { ThunderboltOutlined } from '@ant-design/icons'
// import DefaultAvatar from '../images/avatar-default-small.png'
import classes from '../styles/classes'
import axios from 'axios'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ user, filename, onPress = null }) => {

    const [loading, setLoading] = useState(false)
    const [online, setOnline] = useState(false)

    useEffect(() => {
        checkStatus()
    }, [])
    
    const checkStatus = async () => {
        setLoading('Validating token...')
        const isValid = await axios
            .post('/api/token', { id: user._id })
        setOnline(isValid)
        setLoading(null)
    }

    const getSource = () => filename
        ? `${IMAGE_PATH}/${user.username}/${filename}`
        : `${IMAGE_PATH}/avatar-default-small.png`

    return (
        <Pressable
            disabled={!onPress}
            onPress={onPress}
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginBottom: 10,
            }}
        >
            <View
                style={{
                    flexBasis: 'auto',
                    marginRight: 10,
                }}
            >
                <Image
                    style={{
                        width: 32,
                        height: 32,
                        resizeMode: 'stretch',
                    }}
                    // onLoadStart={() => setLoading(true)}
                    // onLoadEnd={() => setLoading(false)}
                    source={getSource()}
                />
            </View>
    
            {!loading && (
                <View
                    style={{
                        flexBasis: 'auto',
                    }}
                >
                    <Text style={classes.userHeading}>{user.username} {online && <ThunderboltOutlined style={{ color: 'green' }} />}</Text>
                </View>
            )}
        </Pressable>
    )
}