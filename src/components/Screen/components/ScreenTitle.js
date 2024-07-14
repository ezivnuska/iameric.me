import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import { UserNav } from './'
import { Pressable } from 'react-native'
import { navigate } from '@utils/navigation'
import { useApp } from '@app'

export default ({ title, profile, ...props }) => {
    
    const { theme } = useApp()

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 10,
                gap: 10,
            }}
        >
            <View style={{ flexGrow: 0 }}>
                <Pressable
                    onPress={() => navigate('User')}
                    disabled={!profile}
                >
                    <ThemedText
                        bold
                        size={20}
                        color={profile && props.route.name !== 'User' ? theme?.colors.textDefault : '#aaa'}
                    >
                        {title}
                    </ThemedText>
                </Pressable>
            </View>

            {profile && (
                <View style={{ flexGrow: 0 }}>
                    <UserNav {...props} />
                </View>
            )}

        </View>
    )
}