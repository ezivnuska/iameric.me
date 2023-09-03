import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    Avatar,
    LocationDetails,
    Menu,
} from '.'
import axios from 'axios'
import { navigate } from '../navigators/RootNavigation'
import defaultStyles from '../styles'

const Storefront = ({ id }) => {

    const [loading, setLoading] = useState(true)
    const [vendor, setVendor] = useState(null)

    useEffect(() => {
        getVendor()
    }, [])

    // useEffect(() => {
    //     if (loading) return
    //     console.log('vendor changed', vendor)
    //     if (typeof vendor.location != 'string') {
    //         setVendor({
    //             ...vendor,
    //             location: vendor.location,
    //         })
    //     } else getVendorLocation()
    // }, [vendor])

    const getVendor = async () => {
        setLoading(true)
        const { data: { user } } = await axios.get(`/api/users/${id}`)
        setLoading(false)
        if (!user) return console.log('oops... could not get vendor details')
        setVendor(user)
    }

    const getVendorLocation = async () => {
        setLoading(true)
        const response = await axios.
            get(`/api/user/location/${vendor._id}`)
        
        setLoading(false)

        if (!response) {
            console.log('could not get users location')
            return null
        }

        setVendor(response)
    }

    return (
        <View style={styles.container}>
            
            <TouchableOpacity onPress={() => navigate('Home')}>
                <Text style={styles.backButton}>&lt; Back</Text>
            </TouchableOpacity>
            
            {
                vendor ? (
                    <View>
                        <View style={styles.vendorHeading}>
                            <View style={styles.vendorAvatar}>
                                <Avatar size={70} path={`${vendor.username}/${vendor.profileImage.filename}`} />
                            </View>
                            <View style={styles.vendorDetails}>
                                <Text style={defaultStyles.heading}>{vendor.username}</Text>
                                {vendor.location ? <LocationDetails location={vendor.location} /> : null}
                            </View>
                        </View>
                        <Menu vendorId={vendor._id} />
                    </View>
                ) : null
            }
        
        </View>
    )
}

export default Storefront

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
    },
    backButton: {
        paddingVertical: 15,
    },
    vendorHeading: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        columnGap: 10,
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderBottomStyle: 'dotted',
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
    title: {
        marginBottom: 5,
    },
})