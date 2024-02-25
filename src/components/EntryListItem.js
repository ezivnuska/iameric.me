import React, { useContext } from 'react'
import {
    View,
} from 'react-native'
import {
    ThemedText,
    UserHeading,
} from '@components'
import { AppContext } from '../AppContext'
import IconButton from './IconButton'

export default ({ entry, onDelete }) => {
    
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
                    alignItems: 'flex-start',
                }}
            >
                
                <UserHeading
                    user={author}
                    filename={author.profileImage?.filename}
                    style={{ alignItems: 'flexStart' }}
                    onPress={() => {
                        dispatch({ type: 'SET_PROFILE', profile: author })
                        dispatch({ type: 'SET_MODAL', modalName: 'PROFILE' })
                    }}
                >
                    <ThemedText
                        style={{
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