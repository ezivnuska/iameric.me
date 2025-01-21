import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Screen, UserList } from '@components'
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
            full={landscape}
            secure
        >
    
            <View style={{ flex: 1 }}>

                {loading
                    ? <ActivityIndicator size='small' />
                    : userIds && <UserList data={userIds} onPress={onPress} />
                }

            </View>

        </Screen>
    )
}

export default UserListScreen