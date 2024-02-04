import React, { useContext, useEffect } from 'react'
import {
    ActivityIndicator,
    Pressable,
    View,
} from 'react-native'
import {
    DefaultText,
    UserHeading,
} from '@components'
import Icon from 'react-native-vector-icons/Ionicons'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'

export default ({ entry, onDelete }) => {
    
    const {
        state,
        users,
    } = useContext(AppContext)
    
    const { user } = state
    const { author, text } = entry

    const isUserOnline = () => {
        const currentUser = users ? users.filter(u => u._id === author._id)[0] : null
        if (currentUser) return currentUser.token !== null
    }
        
    return (
        <View>
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
                            user={author}
                            filename={author.profileImage.filename}
                            onPress={() => navigate('User', { id: author._id })}
                            styleProps={{
                                flex: 1,
                                flexBasis: 'auto',
                                flexGrow: 1,
                            }}
                        />

                        {(author._id === user._id || user.role === 'admin') ? (
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
                        <DefaultText>{text}</DefaultText>
                    </View>
                </View>
            ) : <ActivityIndicator size='small' />}
        </View>
    )
}