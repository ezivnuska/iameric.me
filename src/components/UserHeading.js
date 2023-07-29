import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { Avatar } from '.'
import defaultStyles from '../styles'

const UserHeading = ({ user, styleProps, ...props }) => {
    
    const { profileImage, userId, username } = user
    const [path, setPath] = useState(null)
    
    useEffect(() => {
        if (!user) return
        setPath(profileImage ? `${username}/${profileImage}` : 'avatar-default-small.png')
    }, [user])

    return (
        <View style={[styles.container, styleProps]}>
            <View style={styles.leftColumn}>
                <Avatar
                    path={path}
                    size={24}
                />
            </View>
            <View style={styles.main}>
                <Text style={styles.heading}>{username}</Text>
            </View>
        </View>
    )
}

export default UserHeading

const styles = StyleSheet.create({
    container: {
        padding: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: 'green',
    },
    leftColumn: {
        flex: 1,
        flexBasis: 'auto',
        flexGrow: 0,
        flexShrink: 0,
        marginRight: 10,
    },
    main: {
        flex: 2,
        flexGrow: 1,
        flexBasis: 'auto',
    },
    heading: {
        fontSize: 18,
        fontWeight: 600,
        lineHeight: 24,
    },
})