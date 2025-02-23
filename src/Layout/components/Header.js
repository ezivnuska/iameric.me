import React from 'react'
import { View } from 'react-native'
import { Appbar, IconButton } from 'react-native-paper'
import { NavBar, SmartAvatar } from '@components'
import { useModal, useTheme, useUser } from '@context'

const Header = props => {
    
    const { landscape } = useTheme()
    const { user } = useUser()
    const { addModal } = useModal()
    
    return (
        <Appbar.Header
            style={{
                width: '100%',
                maxWidth: landscape ? null : 600,
                marginHorizontal: 'auto',
                justifyContent: 'space-between',
            }}
        >
            
            <Appbar.Content
                title={`iam${user?.username || 'eric'}`}
                titleVariant='headlineLarge'
                titleStyle={{ fontWeight: 700 }}
                onPress={() => props.navigation.navigate('Home')}
            />

            {/* {landscape && (
                <View style={{ flexGrow: 1 }}>
                    <NavBar {...props} />
                </View>
            )} */}

            {user && (
                <Appbar.Action icon='bookshelf' onPress={() => props.navigation.navigate('Memories')}
                style={{ margin: 0, padding: 0 }}
                />
            )}

            {user && (
                <Appbar.Action icon='newspaper-variant-multiple' onPress={() => props.navigation.navigate('Feed')}
                    style={{ margin: 0, padding: 0 }}
                />
            )}
            
            {user && (
                <Appbar.Action icon='account-group' onPress={() => props.navigation.navigate('Users')}
                    style={{ margin: 0, padding: 0 }}
                />
            )}

            <Appbar.Action icon='certificate' onPress={() => props.navigation.navigate('Work')}
                style={{ margin: 0, padding: 0 }}
            />
            
            {user ? (
                <SmartAvatar
                    user={user}
                    onPress={() => props.navigation.navigate('User', { screen: 'Profile', params: { username: user?.username } })}
                    size={35}
                    style={{ paddingHorizontal: 10 }}
                />
            ) : (
                <IconButton
                    icon='power'
                    // mode='contained'
                    onPress={() => addModal('AUTH')}
                    // style={{ marginRight: 10 }}
                    // compact
                />
            )}

        </Appbar.Header>
    )
}

export default Header