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
import classes from '../styles/classes'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ navigation, route }) => {

    const {
        dispatch,
        users,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(null)
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

        setLoading('Loading users...')

        const loadedUsers = await loadUsers(loadedUsers)
        
        if (loadedUsers) {
            dispatch({ type: 'SET_USERS', users: loadedUsers })
        }

        setLoading(null)
    }

    // TODO: clean this.
    const renderUserAvatar = () => {
        
        const filename = (userDetails.profileImage && userDetails.profileImage.filename)
            ? userDetails.profileImage.filename
            : null
        
        const source = filename ?
            `${IMAGE_PATH}/${userDetails.username}/${filename}` :
            `${IMAGE_PATH}/avatar-default.png`
        
        return (
            <Image
                source={source}
                style={{
                    width: '100%',
                    height: 200,
                    // backgroundColor: '#000',
                    resizeMode: 'cover',
                    marginVertical: 15,
                }}
            />
        )
    }

    return (
        <SecureScreen navigation={navigation}>
            
            {loading
                ? <LoadingView label={loading} />
                : userDetails
                    ? (
                        <>
                            <Pressable
                                onPress={() => navigation.navigate('VendorList')}
                                style={{
                                    paddingBottom: 10,
                                }}
                            >
                                <Text style={classes.textDefault}>
                                    &lt; Back
                                </Text>
                            </Pressable>
                            
                            <Text style={classes.headerSecondary}>{userDetails.username}</Text>
                            <Text style={classes.textDefault}>{userDetails.email}</Text>

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