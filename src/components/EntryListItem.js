import React, { useEffect, useContext, useState } from 'react'
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { CloseCircleOutlined } from '@ant-design/icons'
import defaultStyles from '../styles'
import { AppContext } from '../AppContext'
import UserHeading from './UserHeading'
import axios from 'axios'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets/images' : '/assets/images'

const EntryListItem = ({ entry, deleteEntry }) => {
    
    const {
        state,
        dispatch,
    } = useContext(AppContext)
    
    const { _id, userId, username, text } = entry
    const { user } = state
    const [deleting, setDeleting] = useState(false)
    const [author, setAuthor] = useState(null)

    const getAuthor = () => {
        axios
            .get(`/api/users/${userId}`)
            .then(({ data }) => {
                setAuthor(data.user)
            })
            .catch(err => console.log('Error getting author', err))
    }

    useEffect(() => {
        getAuthor()
    }, [])

    useEffect(() => {
        setDeleting(false)
        getAuthor()
    }, [entry])

    return author ? (
        <View style={styles.container}>
            <View style={[styles.flexContainer, (deleting ? styles.setForDeletion : null)]}>
                
                <UserHeading
                    user={author}
                    styleProps={styles.userHeading}
                />

                {userId === user._id ? (
                    <View style={styles.aside}>
                        <TouchableOpacity
                            style={styles.iconDelete}
                            onPress={() => {
                                setDeleting(true)
                                deleteEntry(_id)
                            }}
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
    ) : null
}

export default EntryListItem

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        // borderWidth: 1,
        // borderColor: 'red',
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderWidth: 1,
        // borderColor: 'blue',
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
        padding: 5,
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
        // paddingHorizontal: 10,
    },
})