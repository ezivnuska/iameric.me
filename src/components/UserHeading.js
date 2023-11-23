import React from 'react'
import {
    Image,
    Text,
    View,
} from 'react-native'
import main from '../styles/main'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ user }) => (
    <View
        style={[
            {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
            },
            main.paddedV
        ]}
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
                    (user.profileImage && user.profileImage.filename)
                    ? `${IMAGE_PATH}/${user.username}/${user.profileImage.filename}`
                    : `${IMAGE_PATH}/avatar-default-small.png`
                }
            />
        </View>

        <View
            style={{
                flexBasis: 'auto',
            }}
        >
            <Text style={[main.subheading, { lineHeight: 24 }]}>{user.username}</Text>
        </View>
    </View>
)