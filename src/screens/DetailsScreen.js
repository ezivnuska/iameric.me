import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    Avatar,
    Menu,
    Screen,
    LocationDetails,
} from '../components'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'
import axios from 'axios'
import defaultStyles from '../styles'

const DetailsScreen = ({ navigation, route }) => {

    const {
        dispatch,
        state,
        cart,
    } = useContext(AppContext)

    // const { cart, user } = state
    const { id } = route.params

    const [loading, setLoading] = useState(false)
    const [vendor, setVendor] = useState(null)

    useEffect(() => {
        getVendor()
    }, [])

    const getVendor = async () => {
        setLoading(true)
        const { data: { user } } = await axios.get(`/api/users/${id}`)
        setLoading(false)
        if (!user) return console.log('oops... could not get vendor details')
        setVendor(user)
    }

    const renderVendorHeader = () => {
        return (
            <View style={styles.vendorHeading}>
                <View style={styles.vendorAvatar}>
                    <Avatar size={70} path={`${vendor.username}/${vendor.profileImage.filename}`} />
                </View>
                <View style={styles.vendorDetails}>
                    <Text style={defaultStyles.heading}>{vendor.username}</Text>
                    {vendor.location ? <LocationDetails location={vendor.location} /> : null}
                </View>
            </View>
        )
    }

    return (
        <Screen>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigate('Home')}
            >
                <Text style={defaultStyles.text}>&lt; Back</Text>
            </TouchableOpacity>
            
            {vendor ? (
                <View>
                    {renderVendorHeader()}
                    <Menu vendorId={vendor._id} />
                </View>
            ) : <Text>Loading Vendor...</Text>}
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
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
})