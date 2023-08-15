import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import defaultStyles from '../styles'
import { ContactsOutlined } from '@ant-design/icons'

const LocationDetails = ({ location }) => {

    const { address1, address2, city, state, zip } = location
    
    return (
        <View style={styles.container}>
            <Text style={defaultStyles.text}>{address1}{address2.length ? ` ${address2}` : null}</Text>
            <Text style={defaultStyles.text}>{`${city}, ${state} ${zip}`}</Text>
        </View>
    )
}

export default LocationDetails

const styles = StyleSheet.create({
    container: {
               
    },
})