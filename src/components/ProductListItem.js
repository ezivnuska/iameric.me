import React, { useEffect, useContext, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
// import { CloseCircleOutlined } from '@ant-design/icons'
import main from '../styles/main'
import { EditButton } from '.'


const ProductListItem = ({ item, onDelete, update, onPress, ...props }) => {
    const { _id, desc, price, title, vendorId, blurb, category } = item
    const [modalVisible, setModalVisible] = useState(false)

    const onProductPressed = () => {
        onPress()
    }

    const onComplete = () => {
        update()
        // setModalVisible(false)
    }

    const deleteItem = id => {
        onDelete(id)
        // setModalVisible(false)
    }

    return (
        <View
            {...props}
            style={{
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                paddingVertical: 10,
            }}
        >
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <View style={styles.main}>
                    <Text style={[main.text, styles.title]}>{title} <EditButton onPress={onPress} /></Text>
                </View>
                <Text style={[main.text, styles.price]}>${price}</Text>
            </View>

            <Text style={[main.text, styles.blurb]}>{blurb}</Text>
            <Text style={[main.text, styles.desc]}>{desc}</Text>
        </View>
    )
}

export default ProductListItem

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 700,
    },
    price: {
        flex: 1,
        flexBasis: '20%',
        textAlign: 'right',
        fontSize: 18,
        fontWeight: 700,
        color: '#666',
    },
    desc: {

    },
    blurb: {

    },
    username: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: 700,
        marginTop: 2, 
        color: '#999',
    },
    aside: {
        flex: 1,
        flexBasis: 'auto',
        flexShrink: 1,
        flexGrow: 0,
        alignContent: 'center',
    },
    iconDelete: {
        marginLeft: 5,
        marginRight: 2,
        paddingTop: 2,
    },
})