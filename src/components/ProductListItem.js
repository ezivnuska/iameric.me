import React, { useEffect, useContext, useState } from 'react'
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { ImageLoader } from '.'
// import { CloseCircleOutlined } from '@ant-design/icons'
import main from '../styles/main'
import { EditButton } from '.'
import { AppContext } from '../AppContext'
import { getImageDataById } from '../Data'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const ProductListItem = ({ item, onDelete, update, onPress, ...props }) => {

    const { _id, desc, price, title, vendorId, blurb, category, imageId } = item
    // const [modalVisible, setModalVisible] = useState(false)
    const [productImage, setProductImage] = useState(null)

    const {
        dispatch,
        user,
    } = useContext(AppContext)

    useEffect(() => {
        if (!item.imageId && productImage) setProductImage(null)
        if (
            (!productImage && item.imageId)
            ||
            (productImage && productImage._id !== item.imageId)
        ) {
            fetchImageData(item.imageId)
        }
    }, [item])
 
    // const onProductPressed = () => {
    //     onPress()
    // }

    // const onComplete = () => {
    //     update()
    //     // setModalVisible(false)
    // }

    // const deleteItem = id => {
    //     onDelete(id)
    //     // setModalVisible(false)
    // }

    const fetchImageData = async id => {
        
        const imageData = await getImageDataById(id)

        setProductImage(imageData)
        dispatch({ type: 'UPDATE_PRODUCT_IMAGE', imageId: id })
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
            {productImage ? (
                <Image
                    width={IMAGE_SIZE}
                    height={IMAGE_SIZE}
                    source={{ uri: `${IMAGE_PATH}/${productImage.user.username}/thumb/${productImage.filename}` }}
                    style={{
                        resizeMode: 'stretch',
                        width: IMAGE_SIZE,
                        height: IMAGE_SIZE,
                        borderWidth: 1,
                        borderColor: '#999',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                    }}
                />
            ) : null}
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