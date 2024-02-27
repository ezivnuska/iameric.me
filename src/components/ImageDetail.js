import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    Pressable,
    Text,
    useWindowDimensions,
    View,
} from 'react-native'
import {
    IconButton,
    ProductSelector,
    ThemedText,
} from '.'
import { AppContext } from '../AppContext'
import axios from 'axios'
import layout from '@styles/layout'
import { useTheme } from 'react-native-paper'
import { getOrientation } from '@utils/metrics'
import { loadProducts } from '@utils/data'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ image, deleteImage, setAvatar, setProductImage }) => {

    const theme = useTheme()
    const dims = useWindowDimensions()

    const {
        dispatch,
        loading,
        products,
        user,
    } = useContext(AppContext)

    const [orientation, setOrientation] = useState('portrait')

    // useEffect(() => {
    //     console.log('image', image)
    // }, [])

    useEffect(() => {
        if (dims) {
            const newOrientation = getOrientation(dims)
            if (newOrientation !== orientation) setOrientation(newOrientation)
        }
    }, [dims])

    useEffect(() => {
        if (!products) fetchProducts(user._id)
    }, [products])

    const fetchProducts = async id => {

        dispatch({ type: 'SET_LOADING', loading: 'Loading products...' })
        const updatedProducts = await loadProducts(id)
        dispatch({ type: 'SET_PRODUCTS', products: updatedProducts })
        dispatch({ type: 'SET_LOADING', loading: null })
    }

    return (image && user) ? (
        <Pressable
            onPress={() => dispatch({ type: 'CLOSE_MODAL' })}
            style={{
                justifyContent: 'flex-start',
                width: '100%',
                alignItems: 'center',
                paddingTop: 20,
                paddingBottom: 40,
            }}
        >
            <View
                style={{
                    flexBasis: 'auto',
                    flexGrow: 1,
                    marginVertical: 20,
                }}
            >
                <Image
                    source={{
                        uri: `${IMAGE_PATH}/${image.user.username}/${image.filename}`,
                    }}
                    style={{
                        resizeMode: 'contain',
                        height: image.height,
                        width: image.width,
                        marginHorizontal: 'auto',
                    }}
                />
            </View>

            {(user._id === image.user._id) ? (
                <View
                    style={{
                        flexBasis: 'auto',
                        marginHorizontal: 'auto',
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: orientation === 'portrait' ? 'row' : 'column',
                            justifyContent: 'space-evenly',
                            width: '100%',
                            // height: 50,
                            // marginVertical: layout.verticalPadding,
                            paddingHorizontal: 'auto',//layout.horizontalPadding,
                            marginBottom: 10,
                        }}
                    >
                        
                        {(!user.profileImage || (user.profileImage && user.profileImage._id !== image._id)) ? (
                            <IconButton
                                type='primary'
                                label='Set as Avatar'
                                onPress={setAvatar}
                                disabled={loading}
                                style={{
                                    // flex: 1,
                                    color: theme?.colors.textDefault,
                                }}
                            />
                        ) : null}

                        {user.username !== 'Driver' &&
                        user.username !== 'Customer' &&
                        user.username !== 'Vendor' && (
                            <IconButton
                                type='danger'
                                label='Delete Image'
                                onPress={deleteImage}
                                disabled={loading}
                                style={{
                                    flex: 1,
                                }}
                            />
                        )}

                    </View>

                    {(user.role === 'vendor' &&
                    (products && products.length)) ? (
                        <View style={{
                            flex: 1,
                            width: '100%',
                        }}>
                            <ThemedText bold>
                                Set as Product Image
                            </ThemedText>

                            <ProductSelector
                                onSelect={setProductImage}
                                products={products}
                                imageId={image._id}
                            />
                        </View>
                    ) : null}
                </View>
            ) : null}
        </Pressable>
    ) : null
}