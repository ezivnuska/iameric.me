import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
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

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const DetailsScreen = ({ navigation, route }) => {

    const {
        dispatch,
        vendors,
        users,
    } = useContext(AppContext)

    const { id } = route.params

    const [loading, setLoading] = useState(null)
    const [vendor, setVendor] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (users) getUser()
        else getUsers()
    }, [])

    useEffect(() => {
        if (users) getUser()
    }, [users])

    const getUser = () => {
        const u = users.filter(u => u._id === id)[0]
        setUser(u)
    }

    const getUsers = async () => {
        const { data } = await axios
            .get('/api/users')
        
        if (!data) {
            console.log('could not get all users.')
            return
        }

        dispatch({ type: 'SET_USERS', users: data.users })
    }

    // TODO: clean this.
    const renderUserAvatar = () => {
        console.log('user.profileImage', user.profileImage)
        const source = user.profileImage && user.profileImage.filename
            ?
            `${IMAGE_PATH}/${user.username}/${user.profileImage.filename}`
            :
            `${IMAGE_PATH}/avatar-default.png`
        console.log('source', source)
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

    const renderVendorHeader = () => (
        <View style={main.paddedV}>
            <Heading>{vendor.username}</Heading>
            {vendor.location ? <LocationDetails location={vendor.location} /> : null}
        </View>
    )

    return (
        <Screen>

            {loading
            ?
            (<CenteredContent>
                <LoadingView label={loading} />
            </CenteredContent>)
            :
            user
            ? (<>
                <CenteredContent>
                    <BackButton />
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
            </>)
            :
            (<CenteredContent>
                <Text style={[main.text, main.padded]}>Could not load user data.</Text>
            </CenteredContent>)
            }
            
        </Screen>
    )
}

export default DetailsScreen