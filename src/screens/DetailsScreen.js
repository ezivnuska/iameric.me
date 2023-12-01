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
import { goBack } from '../navigators/RootNavigation'
import { loadUsers } from '../utils/data'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ route }) => {

    const {
        dispatch,
        users,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(null)
    const [userDetails, setUserDetails] = useState(null)

    useEffect(() => {

        if (!route.params || !route.params.id) goBack()
        
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

        setLoading(true)
            
        const loadedUsers = await loadUsers(loadedUsers)
        
        if (loadedUsers) {
            dispatch({ type: 'SET_USERS', users: loadedUsers })
        }

        setLoading(false)
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
        <SecureScreen>
            
            {loading
                ? <LoadingView label={loading} />
                : userDetails
                    ? (
                        <>
                            <Pressable
                                onPress={() => goBack()}
                            >
                                <Text
                                    style={{
                                        paddingVertical: 10,
                                        paddingHorizontal: 15,
                                    }}
                                >
                                    &lt; Back
                                </Text>
                            </Pressable>

                            <Text>{userDetails.username}</Text>

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