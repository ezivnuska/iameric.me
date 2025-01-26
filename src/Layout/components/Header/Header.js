import React  from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { UserAvatar } from '@components'
import { useModal, useTheme, useUser } from '@context'
import { Button, IconButton, Text } from 'react-native-paper'

const Header = props => {
    
    const { user } = useUser()
    const { setModal } = useModal()
    
    return (
            
        <View style={styles.headerContent}>

            <Pressable
                onPress={() => props.navigation.navigate('Home')}
            >
                <Text
                    variant='headlineLarge'
                    style={{ fontWeight: 700 }}
                >

                    iam{user?.username || 'eric'}

                </Text>

            </Pressable>

            <View
                style={styles.controls}
            >

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
                <Pressable
                    onPress={() => props.navigation.navigate('User', { screen: 'Profile', params: { username: user.username } })}
                >
                    <UserAvatar user={user} size={30} />
                </Pressable>
            ) : (
                <Button
                    onPress={() => setModal('AUTH')}
                    mode='contained'
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
        paddingHorizontal: 10,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})