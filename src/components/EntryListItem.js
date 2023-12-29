import React, { useEffect, useContext, useState } from 'react'
import {
    ActivityIndicator,
    Text,
    Pressable,
    View,
} from 'react-native'
import { CloseCircleOutlined } from '@ant-design/icons'
import defaultStyles from '../styles/main'
import { AppContext } from '../AppContext'
import UserHeading from './UserHeading'
import { navigate } from '../navigators/RootNavigation'

export default ({ entry, onDelete, ...props }) => {
    
    const {
        state,
        dispatch,
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
                marginBottom: 5,
            }}
        >
            {author ? (
                <View>
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
                                    <CloseCircleOutlined />
                                </Pressable>
                            </View>
                        ) : null}
                    </View>
                    <View
                        style={{
                            paddingBottom: 5,
                            borderBottomWidth: 1,
                            borderBottomColor: '#ccc',
                        }}
                    >
                        <Text style={[defaultStyles.text, { width: '90%' }]}>{text}</Text>
                    </View>
                </View>
            ) : <ActivityIndicator size='small' />}
        </View>
    )
}