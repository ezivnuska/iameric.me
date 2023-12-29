import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    Pressable,
    Text,
} from 'react-native'
import {
    Menu,
    SecureScreen,
    LoadingView,
} from '@components'
import { AppContext } from '../AppContext'
// import { goBack, navigate } from '../navigators/RootNavigation'
import { loadUsers } from '../utils/data'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ navigation, route }) => {

    const {
        dispatch,
        loading,
        users,
    } = useContext(AppContext)

    // const [loading, setLoading] = useState(null)
    const [userDetails, setUserDetails] = useState(null)

    useEffect(() => {

        if (!route.params || !route.params.id)
            console.log('missing required id param')
            // goBack()
        
        if (!users) fetchUsers()

    }, [])
    
    useEffect(() => {
        if (users && (route.params && route.params.id)) getDetails(route.params.id)
    }, [users])

    useEffect(() => {
        if (users && (route.params && route.params.id) && (route.params && route.params.id)) getDetails(route.params.id)
    }, [route.params])

    const getUserDetailsWithId = id => users.filter(u => u._id === id)[0]

    const getDetails = async id => {
        const details = await getUserDetailsWithId(id)
        if (details) {
            setUserDetails(details)
        }
    }

    const fetchUsers = async () => {

        dispatch({ type: 'SET_LOADING', loading: 'Loading users...' })

        const loadedUsers = await loadUsers(loadedUsers)
        
        if (loadedUsers) {
            dispatch({ type: 'SET_USERS', users: loadedUsers })
        }

        dispatch({ type: 'SET_LOADING', loading: null })
    }

    // TODO: clean this.
    const renderUserAvatar = () => {
        const filename = userDetails.profileImage && userDetails.profileImage.filename ? userDetails.profileImage.filename : null
        const source = filename ?
            `${IMAGE_PATH}/${userDetails.username}/${filename}` :
            `${IMAGE_PATH}/avatar-default.png`
        
        return (
            <Image
                source={source}
                style={{
                    width: '100%',
                    height: 200,
                    backgroundColor: '#ccc',
                    resizeMode: 'contain',
                }}
            />
        )
    }

    return (
        <SecureScreen navigation={navigation}>
            
            {loading
                ? <LoadingView />
                : userDetails
                    ? (
                        <>
                            <Pressable
                                onPress={() => navigation.navigate('UserList')}
                            >
                                <Text
                                    style={{
                                        marginBottom: 10,
                                    }}
                                >
                                    &lt; Back
                                </Text>
                            </Pressable>

                            <Text>{userDetails.username}</Text>
                            <Text>{userDetails.email}</Text>

                            {renderUserAvatar()}

                            {userDetails.role === 'vendor' && (
                                <Menu vendor={userDetails} />
                            )}
                        </>
                    )
                    : null
            }
            
        </SecureScreen>
    )
}