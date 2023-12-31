import React, { useEffect, useContext, useState } from 'react'
import {
    ActivityIndicator,
    Text,
    Pressable,
    View,
} from 'react-native'
import UserHeading from './UserHeading'
import Icon from 'react-native-vector-icons/Ionicons'
import classes from '../styles/classes'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'

export default ({ entry, onDelete, ...props }) => {
    
    const {
        state,
        users,
    } = useContext(AppContext)
    
    const { user } = state
    const { userId, username, text } = entry
    const [ author, setAuthor ] = useState({ userId, username })
    const [ filename, setFilename ] = useState(null)

    const getUserFromUsers = () => users ? users.filter(u => u._id === userId)[0] : null

    const isUserOnline = () => {
        const currentUser = users ? users.filter(u => u._id === userId)[0] : null
        if (currentUser) return currentUser.token !== null
    }

    const getFilename = () => {
        const selectedUser = users.filter(u => u._id === userId)[0]
        if (!selectedUser ||
            !selectedUser.profileImage ||
            !selectedUser.profileImage.filename) {
            return null
        } else {
            return selectedUser.profileImage.filename
        }
    }

    useEffect(() => {
        console.log('entry', entry)
    }, [])

    useEffect(() => {
        if (users && !filename) {
            const avatarFilename = getFilename()
            if (avatarFilename) setFilename(avatarFilename)
        }
    }, [users])
        
    return (
        <View
            {...props}
            style={{
                display: 'flex',
            }}
        >
            {author ? (
                <View style={{ paddingTop: 10 }}>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        
                        <UserHeading
                            online={isUserOnline(userId)}
                            username={username}
                            filename={filename}
                            onPress={() => navigate('User', { id: userId })}
                            styleProps={{
                                flex: 1,
                                flexBasis: 'auto',
                                flexGrow: 1,
                            }}
                        />

                        {(userId === user._id || user.role === 'admin') ? (
                            <View
                                style={{
                                    flex: 1,
                                    flexBasis: 'auto',
                                    flexShrink: 1,
                                    flexGrow: 0,
                                    alignContent: 'center',
                                }}
                            >
                                <Pressable
                                    style={{
                                        marginLeft: 5,
                                        marginRight: 2,
                                        paddingTop: 5,
                                    }}
                                    onPress={() => onDelete(entry._id)}
                                >
                                    <Icon name='trash-outline' size={20} color='#fff' />
                                </Pressable>
                            </View>
                        ) : null}
                    </View>
                    <View
                        style={{
                            paddingTop: 7,
                            paddingBottom: 10,
                            borderBottomWidth: 0.5,
                            borderBottomColor: '#666',
                        }}
                    >
                        <Text style={classes.textDefault}>{text}</Text>
                    </View>
                </View>
            ) : <ActivityIndicator size='small' />}
        </View>
    )
}