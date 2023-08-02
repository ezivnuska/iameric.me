import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import defaultStyles from '../styles'

const MenuItem = ({ item, onPress }) => {
    const { _id, price, title, desc, vendorId, blurb, category } = item

    return (
        <View style={styles.container}>
            
            <TouchableOpacity
                onPress={() => onPress(item)}
            >
                <View style={styles.flexContainer}>
                    <Text style={[defaultStyles.text, styles.title]}>{title}</Text>
                    <Text style={[defaultStyles.text, styles.price]}>${price}</Text>
                </View>
                <Text style={[defaultStyles.text, styles.blurb]}>{blurb}</Text>
                <Text style={[defaultStyles.text, styles.desc]}>{desc}</Text>
            </TouchableOpacity>
            
        </View>
    )
}

export default MenuItem

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginBottom: 10,
        paddingBottom: 5,
        // borderWidth: 1,
        // borderColor: '#aaa',
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    flexContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 7,
        paddingVertical: 2,
        paddingBottom: 5,
    },
    title: {
        flex: 1,
        flexBasis: '70%',
        flexShrink: 0,
        flexGrow: 1,
        fontSize: 22,
        fontWeight: 700,
    },
    price: {
        flex: 1,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '30%',
        textAlign: 'right',
        fontSize: 22,
        fontWeight: 700,
        color: '#666',
    },
    blurb: {
        fontSize: 20,
        color: '#777',
        fontWeight: 600,
    },
    desc: {
        marginVertical: 10,
        fontSize: 18,
    },
})