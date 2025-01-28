import React  from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Appbar, Button, IconButton, Text } from 'react-native-paper'
import { UserAvatar } from '@components'
import { useModal, useUser } from '@context'

const Header = props => {
    
    const { user } = useUser()
    const { setModal } = useModal()
    
    return (
        <Appbar.Header>
            
            <Appbar.Content
                title={`iam${user?.username || 'eric'}`}
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
            
            <UserAvatar
                user={user}
                onPress={() => props.navigation.navigate('User', { screen: 'Profile', params: { username: user?.username } })}
                size={35}
                style={{ paddingHorizontal: 10 }}
            />

        </Appbar.Header>
    )
    return (
            
        <View style={styles.headerContent}>

            <Pressable
                onPress={() => props.navigation.navigate('Home')}
            >
                <Text variant='headlineLarge' style={{ fontWeight: 700 }}>
                    iam{user?.username || 'eric'}
                </Text>

            </Pressable>

            <View style={styles.controls}>

                <IconButton
                    icon='account-group'
                    size={25}
                    onPress={() => props.navigation.navigate('Users')}
                    disabled={props.route?.name === 'Users'}
                    selected={props.route?.name === 'Users'}
                />
                
                <IconButton
                    icon='certificate'
                    size={25}
                    onPress={() => props.navigation.navigate('Work')}
                    disabled={props.route?.name === 'Work'}
                    selected={props.route?.name === 'Work'}
                />

                <IconButton
                    icon='newspaper-variant-multiple'
                    size={25}
                    onPress={() => props.navigation.navigate('Feed')}
                    disabled={props.route?.name === 'Feed'}
                    selected={props.route?.name === 'Feed'}
                />

            </View>

            {user ? (
                <UserAvatar
                    user={user}
                    onPress={() => props.navigation.navigate('User', { screen: 'Profile', params: { username: user.username } })}
                    size={40}
                />
            ) : (
                <Button
                    mode='contained'
                    onPress={() => setModal('AUTH')}
                >
                    Sign In
                </Button>
            )}

        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerContent:  {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})