import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, ContactsList, Screen } from '@components'
import { useUser } from '@context'

const ContactsScreen = props => {

    const {
        initUsers,
        user,
        users,
        usersLoaded,
        usersLoading,
    } = useUser()

    useEffect(() => {
        if (!usersLoaded && !usersLoading) initUsers()
    }, [])

    const onPress = username => props.navigation.navigate('User', { screen: 'Profile', params: { username } })

    return (
        <Screen secure {...props}>
    
            <View style={{ flex: 1 }}>

                {users?.length
                    ? <ContactsList contacts={users} onPress={onPress} />
                    : <ActivityIndicator size='medium' />
                }

            </View>

        </Screen>
    )
}

export default ContactsScreen