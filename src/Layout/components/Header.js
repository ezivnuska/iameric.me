import React from 'react'
import { Pressable, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { Row, SmartAvatar } from '@components'
import { useModal, useUser } from '@context'
import { Size } from '@utils/stack'

const Header = props => {
    
    const { user } = useUser()
    const { addModal } = useModal()
    
    return (
        <Row
            align='center'
            padding={[Size.S, Size.S, Size.S, Size.S]}
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

            <Row align='center'>

                {user && (
                    <IconButton
                        icon='bookshelf'
                        onPress={() => props.navigation.navigate('Memories')}
                        style={{ margin: 0 }}
                    />
                )}

                {user && (
                    <IconButton
                        icon='newspaper-variant-multiple'
                        onPress={() => props.navigation.navigate('Feed')}
                        style={{ margin: 0 }}
                    />
                )}
                
                {user && (
                    <IconButton
                        icon='account-group'
                        onPress={() => props.navigation.navigate('Users')}
                        style={{ margin: 0 }}
                    />
                )}

                <IconButton
                    icon='certificate'
                    onPress={() => props.navigation.navigate('Work')}
                    style={{ margin: 0 }}
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
                        style={{ margin: 0 }}
                    />
                )}

            </Row>

        </Row>
    )
}

export default Header