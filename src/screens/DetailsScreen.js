import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    BackButton,
    Heading,
    Menu,
    Screen,
    LoadingView,
    LocationDetails,
    PanelView,
} from '../components'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'
import axios from 'axios'
import main from '../styles/main'
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets/images' : '/images'

const DetailsScreen = ({ navigation, route }) => {

    const {
        dispatch,
        state,
        cart,
        vendors,
    } = useContext(AppContext)

    // const { cart, user } = state
    const { id } = route.params

    const [loading, setLoading] = useState(false)
    const [vendor, setVendor] = useState(null)

    useEffect(() => {
        console.log('vendors...', vendors)
        if (vendors) getVendor()
    }, [vendors])

    useEffect(() => {
        if (vendor) getProducts()
    }, [vendor])

    const getVendor = () => {
        console.log('vendors', vendors)
        const v = vendors.filter(v => v._id === id)[0]
        console.log('v', v)
        setVendor(v)}

    const getProducts = async () => {
        setLoading(true)
        const { data } = await axios.get(`/api/products/${id}`)
        setLoading(false)
        console.log('products data', data)
        if (!data.items) return console.log('oops... could not get vendor products')
        dispatch({ type: 'SET_PRODUCTS', vendor: id, products: data.items })
    }

    // TODO: clean this.
    const renderVendorAvatar = () => (
        <PanelView type='full'>
            <Image
                style={[
                    styles.stretch,
                    {
                        width: '100%',
                        height: 200,
                        backgroundColor: '#ccc',
                    }
                ]}
                // onLoadEnd={() => setLoading(false)}
                source={
                    vendor
                    ? `${IMAGE_PATH}/${vendor.username}/${vendor.profileImage.filename}`
                    : `${IMAGE_PATH}/avatar-default.png`
                }
            />
        </PanelView>
    )

    // const renderVendorHeader = () => {
    //     return (
    //         <View style={styles.vendorHeading}>
    //             <View style={styles.vendorAvatar}>
    //                 <Avatar size={70} path={`${vendor.username}/${vendor.profileImage.filename}`} />
    //             </View>
    //             <View style={styles.vendorDetails}>
    //                 <Text style={main.heading}>{vendor.username}</Text>
    //                 {vendor.location ? <LocationDetails location={vendor.location} /> : null}
    //             </View>
    //         </View>
    //     )
    // }
    const renderVendorHeader = () => (
        <View style={main.paddedV}>
            <Heading>{vendor.username}</Heading>
            {vendor.location ? <LocationDetails location={vendor.location} /> : null}
        </View>
    )

    return (
        <Screen>
            <PanelView type='full' style={{ height: '100%' }}>

            {loading
                ? <LoadingView label='Loading Vendor...' />
                : vendor
                    ? (
                        <View>
                            <PanelView>
                                <BackButton />
                                {renderVendorAvatar()}
                                {renderVendorHeader()}
                            </PanelView>
                            <PanelView type='expanded'>
                                <Menu vendorId={vendor._id} />
                            </PanelView>
                        </View>
                    ) : <Text style={[main.text, main.padded]}>Could not load vendor...</Text>}
            
            </PanelView>
        </Screen>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({
    container: { 
        marginHorizontal: 'auto',
        minWidth: 350,
        maxWidth: 450,
        width: 375,
    },
    vendorHeading: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        columnGap: 10,
        paddingBottom: 10,
        paddingHorizontal: 5,
        marginBottom: 10,
    },
    vendorAvatar: {
        flex: 1,
        flexBasis: 'auto',
        flexGrow: 0,
    },
    vendorDetails: {
        flex: 1,
        flexGrow: 1,
    },
    backButton: {
        // paddingHorizontal: 5,
        // paddingVertical: 10,
    },
    stretch: {
        resizeMode: 'contain',
    },
})