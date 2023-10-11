import React, { useEffect, useState } from 'react'
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { Avatar } from '.'
import main from '../styles/main'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const UserHeading = ({ user }) => (
    <View style={[styles.container, main.paddedV]}>
        <View style={styles.avatar}>
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
        <View style={styles.title}>
            <Text style={[main.subheading, { lineHeight: 24 }]}>{user.username}</Text>
        </View>
    </View>
)

export default UserHeading

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    avatar: {
        flexBasis: 'auto',
        marginRight: 10,
    },
    title: {
        flexBasis: 'auto',
    },
})