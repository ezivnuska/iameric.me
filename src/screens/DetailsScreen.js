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
    Screen,
    LoadingView,
    LocationDetails,
} from '../components'
import { AppContext } from '../AppContext'
import axios from 'axios'
import main from '../styles/main'
import { navigationRef } from '../navigators/RootNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { loadUsers } from '../utils/data'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const DetailsScreen = ({ navigation, route }) => {

    const {
        dispatch,
        vendors,
        users,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {

        if (!route.params.id) navigationRef.goBack()
        
        if (!users) fetchUsers()

    }, [])
    
    useEffect(() => {
        if (users) getDetails(route.params.id)
    }, [users])

    const getUserDetailsWithId = id => users.filter(u => u._id === id)[0]

    const getDetails = async id => {
        const userDetails = await getUserDetailsWithId(id)
        if (userDetails) {
            setUser(userDetails)
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
        const source = user.profileImage && user.profileImage.filename
            ?
            `${IMAGE_PATH}/${user.username}/${user.profileImage.filename}`
            :
            `${IMAGE_PATH}/avatar-default.png`
        
        return (
            <Image
                style={{
                    width: '100%',
                    height: 200,
                    backgroundColor: '#ccc',
                    resizeMode: 'contain',
                }}
                source={
                    source
                }
            />
        )
    }

    return (
        <Screen>
            
            {loading
                ? (
                    <CenteredContent>
                        <LoadingView label={loading} />
                    </CenteredContent>
                )
                : user
                    ? (
                        <>
                            <Pressable
                                onPress={() => navigationRef.goBack()}
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

                            {user.role === 'vendor' && (
                                <Menu vendor={user} />
                            )}
                        </>
                    )
                    : (
                        <CenteredContent>
                            <Text style={[main.text, main.padded]}>Could not load user data.</Text>
                        </CenteredContent>
                    )
            }
            
        </Screen>
    )
}

export default DetailsScreen