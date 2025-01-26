import React, { useEffect, useState } from 'react'
import { Screen } from './components'
// import { loadContactIds } from '@utils/contacts'
// import { ActivityIndicator } from '@common'

const Sandbox = props => {

    // const [userIds, setUserIds] = useState(null)
    // const [loading, setLoading] = useState(false)

    // const onPress = username => props.navigation.navigate('User', { screen: 'Profile', params: { username } })

    // const loadIds = async () => {
    //     if (!loading) setLoading(true)
    //     const ids = await loadContactIds()
    //     setLoading(false)

    //     if (ids) {
    //         setUserIds(ids)
    //     } else {
    //         console.log('could not load user ids.')
    //     }
    // }

    // useEffect(() => {
    //     loadIds()
    // }, [])

    return (
        <Screen secure {...props}>
            {/* {loading
                ? <ActivityIndicator size='small' />
                : userIds && <UserList data={userIds} onPress={onPress} />
            } */}
        </Screen>
    )
}

export default Sandbox