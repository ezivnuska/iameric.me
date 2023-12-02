import React from 'react'
import {
    Image,
    Pressable,
    Text,
    View,
} from 'react-native'
import main from '../styles/main'
import { ThunderboltOutlined } from '@ant-design/icons'
import DefaultAvatar from '../images/avatar-default-small.png'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ online, username, filename, onPress = null }) => {
    const getSource = () => filename
        ? `${IMAGE_PATH}/${username}/${filename}`
        : `${IMAGE_PATH}/avatar-default-small.png`

    return (
        <Pressable
            disabled={!onPress}
            onPress={onPress}
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
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
    
            <View
                style={{
                    flexBasis: 'auto',
                }}
            >
                <Text style={[main.subheading, { lineHeight: 32 }]}>{username} {online && <ThunderboltOutlined style={{ color: 'green' }} />}</Text>
            </View>
        </Pressable>
    )
}