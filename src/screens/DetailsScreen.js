import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    Pressable,
    Text,
    View,
} from 'react-native'
import {
    CenteredContent,
    Menu,
    SecureScreen,
    LoadingView,
    LocationDetails,
} from '@components'
import { AppContext } from '../AppContext'
import axios from 'axios'
import main from '../styles/main'
import { navigationRef, goBack } from '../navigators/RootNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { loadUsers } from '../utils/data'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const DetailsScreen = ({ navigation, route }) => {

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
        if (users && route.params && route.params.id) getDetails(route.params.id)
    }, [users])

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
                ? (
                    <CenteredContent>
                        <LoadingView label={loading} />
                    </CenteredContent>
                ) : userDetails
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
                            
                            <CenteredContent type='full'>
                                {renderUserAvatar()}
                            </CenteredContent>
                            
                            {/* <CenteredContent>
                                {renderVendorHeader()}
                            </CenteredContent> */}

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

export default DetailsScreen