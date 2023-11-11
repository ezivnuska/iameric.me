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
    } = useContext(AppContext)

    const { id } = route.params

    const [loading, setLoading] = useState(null)
    const [vendor, setVendor] = useState(null)

    useEffect(() => {
        getVendor()
    }, [])

    const getVendor = () => {
        const v = vendors.filter(v => v._id === id)[0]
        setVendor(v)
    }

    // TODO: clean this.
    const renderVendorAvatar = () => (
        <Image
            style={{
                width: '100%',
                height: 200,
                backgroundColor: '#ccc',
                resizeMode: 'contain',
            }}
            source={
                vendor.profileImage
                ?
                `${IMAGE_PATH}/${vendor.username}/${vendor.profileImage.filename}`
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
            vendor
            ? (<>
                <CenteredContent>
                    <BackButton />
                </CenteredContent>
                
                <CenteredContent type='full'>
                    {renderVendorAvatar()}
                </CenteredContent>
                
                {/* <CenteredContent>
                    {renderVendorHeader()}
                </CenteredContent> */}

                <CenteredContent type='expanded'>
                    <Menu vendor={vendor} />
                </CenteredContent>
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