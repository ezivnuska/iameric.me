import React, { useEffect, useMemo } from 'react'
import { Screen } from './components'
import User, {
    Images,
    UserHeader,
    useUser,
} from '@user'


const UserScreen = ({ route, navigation, ...props }) => {

    const { user } = useUser()

    const { params } = useMemo(() => route, [route])
    const { screen } = useMemo(() => params, [params])

    useEffect(() => {
        console.log('route on init', route, navigation, props)
    }, [])

    const renderScreenContent = () => {
        switch (screen) {
            case 'Images':
                return <Images />
                break
            default: return (
                <User
                    route={route.name}
                    // navigate={navigation.navigate}
                />
            )
        }
    }

    return (
        <Screen
            secure
            // route={route}
            // navigation={navigation} 
            {...props}
        >
            {/* <UserHeader
                username={user.username}
                navigation={navigation}
                route={route}
            /> */}
            {/* {renderScreenContent()} */}
            <User
                route={route.name}
                navigate={navigation.navigate}
            />
        </Screen>
    )
}

export default UserScreen