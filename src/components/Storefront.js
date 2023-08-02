import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
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

    const renderVendorDetails = () => (
        <View>
            <Text style={styles.title}>{vendor.username}</Text>
            <MenuDisplay vendor={vendor} />
        </View>
    )

    return (
        <View style={styles.container}>
            
            <TouchableOpacity onPress={() => navigate('Home')}>
                <Text style={styles.backButton}>&lt; Back</Text>
            </TouchableOpacity>
            
            {vendor ? renderVendorDetails() : null}

        </View>
    )
}

export default Storefront

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
    },
    backButton: {
        paddingVertical: 10,
    },
    title: {
        fontSize: 20,
        lineHeight: 34,
        fontWeight: 700,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderBottomStyle: 'dotted',
    },
})