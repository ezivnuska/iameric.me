import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    DefaultText,
} from '.'
import defaultStyles from '../styles'

const MenuItem = ({ item, onPress }) => {
    
    const { _id, price, title, desc, vendorId, blurb, category } = item
    
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <View style={styles.flexContainer}>
                <Text style={[defaultStyles.subheading, styles.title]}>{title}</Text>
                <Text style={[defaultStyles.subheading, styles.price]}>${price}</Text>
            </View>

            <DefaultText style={styles.blurb}>{blurb}</DefaultText>
            <View style={styles.content}>
                <DefaultText style={styles.desc}>{desc}</DefaultText>
            </View>

        </TouchableOpacity>
    )
}

export default MenuItem

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        paddingBottom: 5,
        backgroundColor: '#eee',
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginBottom: 7,
        paddingTop: 10,
        // paddingBottom: 5,
        paddingHorizontal: 8,
        // paddingBottom: 5,
        backgroundColor: '#900',
        // marginBottom: 5,
    },
    title: {
        flex: 1,
        flexBasis: '70%',
        flexShrink: 0,
        flexGrow: 1,
        color: '#fff',
    },
    price: {
        flex: 1,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '30%',
        textAlign: 'right',
        // color: '#666',
        color: '#fff',
    },
    blurb: {
        // fontSize: 20,
        // color: '#777',
        fontWeight: 600,
        paddingTop: 7,
        paddingHorizontal: 8,
        paddingBottom: 5,
        backgroundColor: 'yellow',
    },
    content: {
        paddingTop: 5,
        paddingHorizontal: 8,
    },
    desc: {
        marginVertical: 10,
        fontSize: 18,
    },
})