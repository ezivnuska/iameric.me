import React from 'react'
import {
    Image,
    Pressable,
    Text,
    View,
} from 'react-native'
import main from '../styles/main'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ username, filename, onPress }) => (
    <Pressable
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
                    width: 24,
                    height: 24,
                    resizeMode: 'stretch',
                }}
                // onLoadStart={() => setLoading(true)}
                // onLoadEnd={() => setLoading(false)}
                source={
                    (filename)
                    ? `${IMAGE_PATH}/${username}/${filename}`
                    : `${IMAGE_PATH}/avatar-default-small.png`
                }
            />
        </View>

        <View
            style={{
                flexBasis: 'auto',
            }}
        >
            <Text style={[main.subheading, { lineHeight: 24 }]}>{username}</Text>
        </View>
    </Pressable>
)