import React, { useEffect, useState } from 'react'
import { Screen } from './components'
import { UserList } from '@components'
import { loadContactIds } from '@utils/contacts'
import { useTheme, useUser } from '@context'

const UserListScreen = props => {

    const { landscape } = useTheme()
    const { user } = useUser()
    
    const [users, setUsers] = useState(null)
    const [loading, setLoading] = useState(false)

    const onPress = username => props.navigation.navigate('User', { screen: 'Profile', params: { username } })

    const loadUserIds = async () => {
        if (!loading) setLoading(true)
        const contacts = await loadContactIds()
        // console.log('contacts', contacts)
        setLoading(false)

        if (contacts) {
            setUsers(contacts.filter(contact => contact._id !== user._id))
        } else {
            console.log('could not load contact ids.')
        }
    }

    useEffect(() => {
        loadUserIds()
    }, [])

    return (
        <Screen
            {...props}
            secure
            full
            // full={landscape}
        >
    
            {users && <UserList data={users} onPress={onPress} />}

        </Screen>
    )
}

export default UserListScreen