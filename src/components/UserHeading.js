import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { Avatar } from '.'
import axios from 'axios'
import main from '../styles/main'

const UserHeading = ({ user, ...props }) => {

    const { _id, profileImage, username } = user
    const [path, setPath] = useState(null)
    
    useEffect(() => {
        console.log('user getting path', user)
        getPath()
    }, [])

    useEffect(() => {
        getPath()
    }, [user])

    const getPath = async () => {
        const { data } = await axios.get(`/api/avatar/${user._id}`)
        const { profileImage } = data
        const imagePath = profileImage ? `${username}/${profileImage.filename}` : 'avatar-default-small.png'
        setPath(imagePath)
    }

    return (
        <View style={[styles.container, main.padded]}>
            <View style={styles.leftColumn}>
                <Avatar
                    path={path}
                    size={24}
                />
            </View>
            <View style={styles.main}>
                <Text style={[main.subheading, { lineHeight: 24 }]}>{username}</Text>
            </View>
        </View>
    )
}

export default UserHeading

const styles = StyleSheet.create({
    container: {
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
})