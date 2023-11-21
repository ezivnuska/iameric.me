import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    Pressable,
    Text,
    View,
} from 'react-native'
import {
    BackButton,
    CenteredContent,
    Heading,
    Menu,
    Screen,
    LoadingView,
    LocationDetails,
} from '../components'
import { AppContext } from '../AppContext'
import axios from 'axios'
import main from '../styles/main'
import { goBack } from '../navigators/RootNavigation'
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
        if (!users) init()
    }, [])
    
    useEffect(() => {
        if (users) getDetails(route.params.id)
    }, [users])

    const init = async () => {
        setLoading(true)
            
        const loadedUsers = await loadUsers(loadedUsers)
        
        if (loadedUsers) {
            dispatch({ type: 'SET_USERS', users: loadedUsers })
        }

        setLoading(false)
    }

    const getUserDetailsWithId = id => users.filter(u => u._id === id)[0]

    const getDetails = async id => {
        const userDetails = await getUserDetailsWithId(id)
        if (userDetails) {
            setUser(userDetails)
        }
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
                            <CenteredContent>
                                <Pressable
                                    onPress={goBack}
                                >
                                    <Text>&lt; Back</Text>
                                </Pressable>
                            </CenteredContent>
                            
                            <CenteredContent type='full'>
                                {renderUserAvatar()}
                            </CenteredContent>
                            
                            {/* <CenteredContent>
                                {renderVendorHeader()}
                            </CenteredContent> */}

                            {user.role === 'vendor' && (
                                <CenteredContent type='expanded'>
                                    <Menu vendor={user} />
                                </CenteredContent>
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