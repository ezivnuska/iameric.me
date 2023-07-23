import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import defaultStyles from '../styles'

const MenuItem = ({ item, onPress }) => {
    const { _id, price, title, desc, vendorId } = item

    return (
        <View style={styles.container}>
            
            <TouchableOpacity
                onPress={() => onPress(item)}
            >
                <View style={styles.flexContainer}>
                    <Text style={[defaultStyles.text, styles.title]}>{title}</Text>
                    <Text style={[defaultStyles.text, styles.price]}>${price}</Text>
                </View>
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
        marginBottom: 8,
        paddingBottom: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    flexContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 7,
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        flex: 1,
        flexBasis: '70%',
        flexShrink: 0,
        flexGrow: 1,
        fontSize: 18,
        fontWeight: 700,
    },
    price: {
        flex: 1,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '30%',
        textAlign: 'right',
        fontSize: 18,
        fontWeight: 700,
        color: '#666',
    },
    desc: {
        paddingHorizontal: 5,
    },
})