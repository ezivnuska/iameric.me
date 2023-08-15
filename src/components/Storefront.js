import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    LocationDetails,
    MenuDisplay
} from '.'
import axios from 'axios'
import { navigate } from '../navigators/RootNavigation'

const Storefront = ({ id }) => {

    const [loading, setLoading] = useState(true)
    const [vendor, setVendor] = useState(null)

    useEffect(() => {
        getVendor()
    }, [])

    const getVendor = async () => {
        const { data: { user } } = await axios.get(`/api/users/${id}`)
        setLoading(false)
        if (!user) return console.log('oops... could not get vendor details')
        setVendor(user)
    }

    return (
        <View style={styles.container}>
            
            <TouchableOpacity onPress={() => navigate('Home')}>
                <Text style={styles.backButton}>&lt; Back</Text>
            </TouchableOpacity>
            
            {
                vendor ? (
                    <View>
                        <View style={styles.vendorDetails}>
                            <Text style={styles.title}>{vendor.username}</Text>
                            {vendor.location ? <LocationDetails location={vendor.location} /> : null}
                        </View>
                        <MenuDisplay vendorId={vendor._id} />)
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
    vendorDetails: {
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderBottomStyle: 'dotted',
    },
    title: {
        fontSize: 20,
        fontWeight: 600,
        marginBottom: 5,
    },
})