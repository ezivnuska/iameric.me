import React from 'react'
import { Pressable, View } from 'react-native'
import { TextCopy, TextPressable, UserAvatar } from '@components'
import { navigate } from '@utils/navigation'

const Brand = ({ size, user }) => {

    return (
        <View>
    
            {user ? (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 3,
                    }}
                >
                    <TextPressable
                        onPress={() => navigate('Home')}
                        size={size}
                        bold
                        color='#000'
                    >
                        iam
                    </TextPressable>
    
                    <Pressable
                        onPress={() => navigate('User', { screen: 'Profile', params: { username: user.username } })}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            gap: 15,
                        }}
                    >
                        <TextCopy
                            bold
                            size={size}
                            color='tomato'
                        >
                            {user.username}
                        </TextCopy>
                        
                        <UserAvatar
                            user={user}
                            size={36}
                        />
    
                    </Pressable>
                    
                </View>
            ) : (
                <Pressable
                    onPress={() => navigate('Home')}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}
                >
                    <TextCopy
                        bold
                        color='#000'
                        size={size}
                    >
                        iam
                    </TextCopy>
    
                    <TextCopy
                        bold
                        color='#999'
                        size={size}
                    >
                        eric
                    </TextCopy>
    
                </Pressable>
            )}
        </View>
    )
}

export default Brand