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

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets/images' : '/images'

const DetailsScreen = ({ navigation, route }) => {

    const {
        dispatch,
        vendors,
    } = useContext(AppContext)

    const { id } = route.params

    const [loading, setLoading] = useState(false)
    const [vendor, setVendor] = useState(null)

    useEffect(() => {
        if (vendors) getVendor()
    }, [vendors])

    useEffect(() => {
        if (vendor) getProducts()
    }, [vendor])

    const getVendor = () => {
        const v = vendors.filter(v => v._id === id)[0]
        setVendor(v)}

    const getProducts = async () => {
        setLoading(true)
        const { data } = await axios.get(`/api/products/${id}`)
        if (!data.items) return console.log('oops... could not get vendor products')
        dispatch({ type: 'SET_PRODUCTS', vendor: id, products: data.items })
        setLoading(false)
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
                vendor
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
                <LoadingView label='Loading Vendor...' />
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
                
                <CenteredContent>
                    {renderVendorHeader()}
                </CenteredContent>

                <CenteredContent type='expanded'>
                    <Menu vendorId={vendor._id} />
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