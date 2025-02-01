import React from 'react'
import { View } from 'react-native'
import { Appbar, IconButton } from 'react-native-paper'
import { UserAvatar } from '@components'
import { useModal, useUser } from '@context'

const Header = props => {
    
    const { authUser } = useUser()
    const { setModal } = useModal()
    
    return (
        <Appbar.Header style={{ justifyContent: 'space-between' }}>
            
            <Appbar.Content
                title={`iam${authUser?.username || 'eric'}`}
                titleVariant='headlineLarge'
                titleStyle={{ fontWeight: 700 }}
                onPress={() => props.navigation.navigate('Home')}
            />
            
            <Appbar.Action icon='account-group' onPress={() => props.navigation.navigate('Users')}
                // style={{ margin: 0, padding: 0 }}
            />

            <Appbar.Action icon='certificate' onPress={() => props.navigation.navigate('Work')}
                // style={{ margin: 0, padding: 0 }}
            />

            <Appbar.Action icon='newspaper-variant-multiple' onPress={() => props.navigation.navigate('Feed')}
                // style={{ margin: 0, padding: 0 }}
            />
            
            {authUser ? (
                <UserAvatar
                    user={authUser}
                    onPress={() => props.navigation.navigate('User', { screen: 'Profile', params: { username: authUser?.username } })}
                    size={35}
                    style={{ paddingHorizontal: 10 }}
                />
            ) : (
                <IconButton
                    icon='power'
                    // mode='contained'
                    onPress={() => setModal('AUTH')}
                    // style={{ marginRight: 10 }}
                    // compact
                />
            )}

        </Appbar.Header>
    )
}

export default Header