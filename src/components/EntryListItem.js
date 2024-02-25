import React, { useContext } from 'react'
import {
    ActivityIndicator,
    Pressable,
    View,
} from 'react-native'
import {
    ThemedText,
    UserHeading,
} from '@components'
import Icon from 'react-native-vector-icons/Ionicons'
import { AppContext } from '../AppContext'
import { navigationRef } from '../navigation/RootNavigation'
import { useTheme } from 'react-native-paper'
import IconButton from './IconButton'

export default ({ entry, onDelete }) => {
    
    const theme = useTheme()
    
    const {
        dispatch,
        user,
    } = useContext(AppContext)
    
    const { author, text } = entry
        
    return (
        <View
            style={{
                paddingHorizontal: 10,
                paddingBottom: 15,
                marginBottom: 10,
            }}
        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                }}
            >
                
                <UserHeading
                    user={author}
                    filename={author.profileImage?.filename}
                    onPress={() => {
                        dispatch({ type: 'SET_PROFILE', profile: author })
                        dispatch({ type: 'SET_MODAL', modalName: 'PROFILE' })
                    }}
                    // onPress={() => navigationRef.navigate('Users', { screen: 'User', params: { id: author._id } })}
                >
                    <ThemedText
                        style={{
                            // maxWidth: 485,
                            flexBasis: 'auto',
                        }}
                    >
                        {text}
                    </ThemedText>
                        
                </UserHeading>

                {(author._id === user._id || user.role === 'admin') ? (
                    <View
                        style={{
                            flex: 1,
                            flexBasis: 'auto',
                            flexShrink: 0,
                            flexGrow: 0,
                            alignContent: 'center',
                        }}
                    >
                        <IconButton
                            iconName='trash-outline'
                            onPress={() => onDelete(entry._id)}
                            // textStyles={{ fontSize: 20 }}
                            // style={{  }}
                            transparent
                        />
                    </View>
                ) : null}
            </View>
        </View>
    )
}