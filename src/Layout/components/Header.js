import React from 'react'
import { Pressable, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { SmartAvatar } from '@components'
import { useModal, useTheme, useUser } from '@context'

const Header = props => {
    
    const { landscape } = useTheme()
    const { user } = useUser()
    const { addModal } = useModal()
    
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: 15,
                paddingRight: 10,
                paddingVertical: (!landscape && 3),
            }}
        >
            <View style={{ flex: 1 }}>
                <Pressable
                    onPress={() => props.navigation.navigate('Home')}
                >
                    <Text
                        variant='headlineLarge'
                        style={{ fontWeight: 700 }}
                    >
                        {`iam${user?.username || 'eric'}`}
                    </Text>
                </Pressable>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {user && (
                    <IconButton
                        icon='bookshelf'
                        onPress={() => props.navigation.navigate('Memories')}
                        style={{ marginHorizontal: 0, marginBottom: 0 }}
                    />
                )}

                {user && (
                    <IconButton
                        icon='newspaper-variant-multiple'
                        onPress={() => props.navigation.navigate('Feed')}
                        style={{ marginHorizontal: 0, marginBottom: 0 }}
                    />
                )}
                
                {user && (
                    <IconButton
                        icon='account-group'
                        onPress={() => props.navigation.navigate('Users')}
                        style={{ marginHorizontal: 0, marginBottom: 0 }}
                    />
                )}

                <IconButton
                    icon='certificate'
                    onPress={() => props.navigation.navigate('Work')}
                    style={{ marginHorizontal: 0, marginBottom: 0 }}
                />
            
                {user ? (
                    <SmartAvatar
                        user={user}
                        onPress={() => props.navigation.navigate('User', { screen: 'Profile', params: { username: user?.username } })}
                        size={35}
                        style={{ paddingLeft: 5 }}
                    />
                ) : (
                    <IconButton
                        icon='power'
                        onPress={() => addModal('AUTH')}
                        style={{ marginHorizontal: 0, marginBottom: 0 }}
                    />
                )}

            </View>

        </View>
    )
}

export default Header