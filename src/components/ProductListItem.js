import React, { useEffect, useContext, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
// import { CloseCircleOutlined } from '@ant-design/icons'
import defaultStyles from '../styles'
import {
    ModalContainer,
    ProductForm,
} from '.'


const ProductListItem = ({ item, onDelete, update }) => {
    const { _id, desc, price, title, vendorId } = item
    const [modalVisible, setModalVisible] = useState(false)

    const onProductPressed = () => {
        setModalVisible(true)
    }

    const onComplete = () => {
        update()
        setModalVisible(false)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onProductPressed}
            >
                <View style={styles.flexContainer}>
                    <Text style={[defaultStyles.text, styles.title]}>{title}</Text>
                    <Text style={[defaultStyles.text, styles.price]}>${price}</Text>
                </View>
                <Text style={[defaultStyles.text, styles.desc]}>{desc}</Text>
                {/* <View style={styles.aside}>
                    <TouchableOpacity
                        style={styles.iconDelete}
                        onPress={() => onDelete(_id)}
                    >
                        <CloseCircleOutlined />
                    </TouchableOpacity>
                </View> */}
            </TouchableOpacity>

            <ModalContainer
                animationType='slide'
                transparent={false}
                visible={modalVisible}
                closeModal={() => setModalVisible(false)}
            >
                <ProductForm
                    onComplete={onComplete}
                    product={item}
                />
            </ModalContainer>
        </View>
    )
}

export default ProductListItem

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        marginBottom: 12,
        paddingBottom: 10,
        borderBottomWidth: 1, 
        borderBottomColor: '#ccc', 
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 7,
    },
    setForDeletion: {
        opacity: .3,
    },
    title: {
        flex: 4,
        flexBasis: '80%',
        flexGrow: 1,
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