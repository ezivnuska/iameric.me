import React, { useEffect, useContext, useState } from 'react'
import {
    ActivityIndicator,
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
import axios from 'axios'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ productId, onDelete, onPress, ...props }) => {

    // const { _id, desc, price, title, vendorId, blurb, category, imageId } = productId
    // const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState(null)
    const [image, setImage] = useState(null)

    const {
        dispatch,
        user,
    } = useContext(AppContext)

    useEffect(() => {
        if (productId) {
            fetchProductData(productId)
        }
    }, [])

    const fetchProductData = async id => {
        console.log('fetching product data for id,', id)
        const { data } = await axios.get(`/api/product/${id}`)
        if (!data) console.log('could not fetch product data.')
        console.log('product data got:', data)
        setProduct(data)
    }

    useEffect(() => {
        if (product) {
            if (product.imageId && !image) fetchImageData(product.imageId)
            if (product.imageId && product.imageId !== image._id) setImage(product.imageId)
        }
        
    }, [product])

    const fetchImageData = async id => {
        
        const imageData = await getImageDataById(id)

        setImage(imageData)
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
            {product ? (
                <View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <View style={styles.main}>
                            <Text style={[main.text, styles.title]}>{product.title} <EditButton onPress={onPress} /></Text>
                        </View>
                        <Text style={[main.text, styles.price]}>${product.price}</Text>
                    </View>
                    {image ? (
                        <Image
                            width={IMAGE_SIZE}
                            height={IMAGE_SIZE}
                            source={{ uri: `${IMAGE_PATH}/${image.user.username}/thumb/${image.filename}` }}
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
                    <Text style={[main.text, styles.blurb]}>{product.blurb}</Text>
                    <Text style={[main.text, styles.desc]}>{product.desc}</Text>
                </View>
            ) : <ActivityIndicator />}
            
        </View>
    )
}

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