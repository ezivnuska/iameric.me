import React, { useContext } from 'react'
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
import { useTheme } from 'react-native-paper'

export default ({ entry, onDelete }) => {
    
    const theme = useTheme()
    
    const {
        user,
    } = useContext(AppContext)
    
    const { author, text } = entry
        
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
                                    <Icon
                                        name='trash-outline'
                                        size={20}
                                        color={theme?.colors.textDefault}
                                    />
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