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

export default ({ product, onDelete, onPress, ...props }) => {
    // const { _id, user, title, price, blurb, desc, category, image } = product

    const {
        dispatch,
        user,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (product.image && typeof product.image === 'string') {
            fetchImageData(product.image)
        } 
    }, [])

    const fetchImageData = async imageId => {
        const imageData = await getImageDataById(imageId)
        console.log('imageData', imageData)
        dispatch({ type: 'SET_PRODUCT_IMAGE_DATA', productId: product._id, imageData })
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
                
                {(product.image && typeof product.image === 'object') ? (
                    <Image
                        width={IMAGE_SIZE}
                        height={IMAGE_SIZE}
                        source={{ uri: `${IMAGE_PATH}/${user.username}/thumb/${product.image.filename}` }}
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