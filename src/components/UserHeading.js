import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { Avatar } from '.'
import axios from 'axios'
import defaultStyles from '../styles'

const UserHeading = ({ user, ...props }) => {

    const { _id, profileImage, username } = user
    const [path, setPath] = useState(null)
    
    useEffect(() => {
        getPath()
    }, [])

    useEffect(() => {
        getPath()
    }, [user])

    const getPath = async () => {
        const { data: { profileImage } } = await axios.get(`/api/avatar/${user._id}`)
        const imagePath = profileImage ? `${username}/${profileImage.filename}` : 'avatar-default-small.png'
        setPath(imagePath)
    }

    return (
        <View style={styles.container}>
            <View style={styles.leftColumn}>
                <Avatar
                    path={path}
                    size={24}
                />
            </View>
            <View style={styles.main}>
                <Text style={[defaultStyles.subheading, { lineHeight: 24 }]}>{username}</Text>
            </View>
        </View>
    )
}

export default UserHeading

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingVertical: 10,
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