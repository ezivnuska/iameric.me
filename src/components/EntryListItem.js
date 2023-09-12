import React, { useEffect, useContext, useState } from 'react'
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { CloseCircleOutlined } from '@ant-design/icons'
import defaultStyles from '../styles/main'
import { AppContext } from '../AppContext'
import UserHeading from './UserHeading'
import axios from 'axios'

const EntryListItem = ({ entry, onDelete, ...props }) => {
    
    const {
        state,
        dispatch,
    } = useContext(AppContext)
    
    const { user } = state
    const { userId, username, text } = entry
    const [author, setAuthor] = useState({ userId, username })

    const getSelf = () => {
        axios
            .get(`/api/users/self/${userId}`)
            .then(({ data }) => {
                if (data.profileImage) setAuthor({
                    ...author,
                    profileImage: data.profileImage,
                })
            })
            .catch(err => console.log('Error getting author', err))
    }
    
    useEffect(() => {
        if (userId && !author.profileImage) {
            // getSelf()
        }
    }, [userId, user])

    return (
        <View style={styles.container} {...props}>
            {author ? (
                <View>
                    <View style={styles.flexContainer}>
                        
                        <UserHeading
                            userId={userId}
                            username={username}
                            user={author}
                            styleProps={styles.userHeading}
                        />

                        {userId === user._id ? (
                            <View style={styles.aside}>
                                <TouchableOpacity
                                    style={styles.iconDelete}
                                    onPress={() => onDelete(entry._id)}
                                >
                                    <CloseCircleOutlined />
                                </TouchableOpacity>
                            </View>
                        ) : null}
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={[defaultStyles.text, styles.text]}>{text}</Text>
                    </View>
                </View>
            ) : <ActivityIndicator size='small' />}
        </View>
    )
}
export default EntryListItem

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        marginBottom: 5,
        paddingBottom: 10,
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    setForDeletion: {
        opacity: .3,
    },
    userHeading: {
        flex: 1,
        flexBasis: 'auto',
        flexGrow: 1,
    },
    username: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: 700,
        marginTop: 2, 
        color: '#999',
    },
    textContainer: {
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        width: '90%',
    },
    aside: {
        flex: 1,
        flexBasis: 'auto',
        flexShrink: 1,
        flexGrow: 0,
        alignContent: 'center',
    },
    iconDelete: {
        marginLeft: 5,
        marginRight: 2,
        paddingTop: 5,
    },
})