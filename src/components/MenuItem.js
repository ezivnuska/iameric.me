import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import main from '../styles/main'
import { PlusOutlined } from '@ant-design/icons'

const MenuItem = ({ item, onPress }) => {
    
    const { _id, price, title, desc, vendorId, blurb, category } = item
    
    return (
        <View style={[styles.container, main.padded]}>
            <View style={styles.flexContainer}>
                <Text style={[main.subheading, styles.title]}>{title}</Text>

                <TouchableOpacity
                    onPress={onPress}
                >
                    <Text style={[main.text, styles.price]}>${price} <PlusOutlined /></Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {(blurb && blurb.length) ? <Text style={main.text}>{blurb}</Text> : null}
                <Text style={[main.text, styles.desc]}>{desc}</Text>
            </View>
        </View>
    )
}

export default MenuItem

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginBottom: 7,
        // paddingTop: 10,
        // paddingBottom: 5,
        // paddingHorizontal: 8,
        // paddingBottom: 5,
        // backgroundColor: '#900',
        marginBottom: 5,
    },
    title: {
        flex: 1,
        flexBasis: '70%',
        flexShrink: 0,
        flexGrow: 1,
        marginTop: 4,
        // color: '#fff',
    },
    price: {
        flex: 1,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '30%',
        textAlign: 'right',
        backgroundColor: '#00f',
        borderRadius: 10,
        paddingVertical: 2,
        paddingHorizontal: 7,
        color: '#fff',
        // color: '#666',
    },
    blurb: {
        // fontSize: 20,
        // color: '#777',
        fontWeight: 600,
        // paddingTop: 7,
        // paddingHorizontal: 8,
        // paddingBottom: 5,
        // backgroundColor: 'yellow',
    },
    content: {
        // paddingTop: 5,
        // paddingHorizontal: 8,
    },
    desc: {
        // marginVertical: 10,
        fontSize: 18,
    },
})