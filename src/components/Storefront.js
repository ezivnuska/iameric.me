import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    MenuDisplay
} from '.'
import { navigate } from '../navigators/RootNavigation'

const Storefront = ({ vendor }) => {
    return (
        <View style={styles.container}>
            
            <TouchableOpacity onPress={() => navigate('home')}>
                <Text style={styles.backButton}>&lt; Back</Text>
            </TouchableOpacity>
            
            <Text style={styles.title}>{vendor.username}</Text>
            
            <MenuDisplay vendor={vendor} />

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
        fontWeight: 700,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderBottomStyle: 'dotted',
    },
})