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
        users,
    } = useContext(AppContext)

    const { id } = route.params

    const [loading, setLoading] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUser()
    }, [])

    const getUser = () => {
        const u = users.filter(u => u._id === id)[0]
        setUser(u)
    }

    // TODO: clean this.
    const renderAvatar = () => (
        <Image
            style={{
                width: '100%',
                height: 200,
                backgroundColor: '#ccc',
                resizeMode: 'contain',
            }}
            source={
                user.profileImage
                ?
                `${IMAGE_PATH}/${user.username}/${user.profileImage.filename}`
                :
                `${IMAGE_PATH}/avatar-default.png`
            }
        />
    )

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
                    {renderAvatar()}
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
                <Text style={[main.text, main.padded]}>Could not load vendor...</Text>
            </CenteredContent>)
            }
            
        </Screen>
    )
}

export default DetailsScreen