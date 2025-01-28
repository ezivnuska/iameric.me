import React, { useEffect, useState } from 'react'
import { Screen } from './components'
import { ActivityIndicator } from 'react-native-paper'
import { UserList } from '@components'
import { loadContactIds } from '@utils/contacts'
import { useTheme } from '@context'

const UserListScreen = props => {

    const { landscape } = useTheme()
    
    const [userIds, setUserIds] = useState(null)
    const [loading, setLoading] = useState(false)

    const onPress = username => props.navigation.navigate('User', { screen: 'Profile', params: { username } })

    const loadIds = async () => {
        if (!loading) setLoading(true)
        const ids = await loadContactIds()
        setLoading(false)

        if (ids) {
            setUserIds(ids)
        } else {
            console.log('could not load user ids.')
        }
    }

    useEffect(() => {
        loadIds()
    }, [])

    return (
        <Screen
            {...props}
            secure
            full
            // full={landscape}
        >
    
            {loading
                ? <ActivityIndicator size='small' />
                : userIds && <UserList data={userIds} onPress={onPress} />
            }

        </Screen>
    )
}

export default UserListScreen