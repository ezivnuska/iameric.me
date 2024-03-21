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
import { loadProducts } from '@utils/data'
import { getImageDims } from '@utils/images'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ image, deleteImage, setAvatar, setProductImage }) => {

    const theme = useTheme()
    const dims = useWindowDimensions()

    const {
        dispatch,
        isLandscape,
        loading,
        products,
        user,
    } = useContext(AppContext)

    const [imageDims, setImageDims] = useState(null)

    useEffect(() => {
        console.log('image', image)
    }, [])

    useEffect(() => {
        if (dims) {
            setImageDims(getImageDims(image.width, image.height, dims))
        }
    }, [dims])

    return (
        <View
            // onPress={() => dispatch({ type: 'CLOSE_MODAL' })}
            style={{
                flexDirection: isLandscape ? 'row' : 'column',
                justifyContent: isLandscape ? 'center' : 'flex-start',
                alignItems: 'flex-start',
                gap: 10,
                width: '100%',
                alignItems: 'center',
                // paddingTop: 20,
                // paddingBottom: 40,
            }}
        >
            <View
                style={{
                    flexBasis: 'auto',
                    flexGrow: 0,
                    // marginVertical: 20,
                }}
            >
                {imageDims && (
                    <Image
                        source={{
                            uri: `${IMAGE_PATH}/${image.user.username}/${image.filename}`,
                        }}
                        style={{
                            resizeMode: 'contain',
                            height: imageDims ? imageDims.height : image.height,
                            width: imageDims ? imageDims.width : image.width,
                            marginHorizontal: 'auto',
                        }}
                    />
                )}
            </View>
            <View
                style={{
                    flexBasis: 'auto',
                    flexGrow: 0,
                    marginVertical: 20,
                }}
            >

                {(user._id === image.user._id || user.role === 'admin') ? (
                    <View
                        style={{
                            flexBasis: 'auto',
                            flexGrow: isLandscape ? 0 : 0,
                        }}
                    >
                        <View
                            style={{
                                flexBasis: 'auto',
                                display: 'flex',
                                flexDirection: isLandscape ? 'column' : 'row',
                                justifyContent: isLandscape ? 'flex-start' : 'stretch',
                                width: '100%',
                                paddingHorizontal: 'auto',
                                marginBottom: 10,
                            }}
                        >
                            
                            {(
                                (!user.profileImage || user.profileImage._id !== image._id)
                                && image.user._id === user._id
                            ) ? (
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

                            {(
                                user.username !== 'Driver' &&
                                user.username !== 'Customer' &&
                                user.username !== 'Vendor' ||
                                user.role === 'admin'
                            ) && (
                                <IconButton
                                    type='danger'
                                    label='Delete'
                                    onPress={deleteImage}
                                    disabled={loading || process.env.NODE_ENV === 'development'}
                                    style={{ flex: 1 }}
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
            </View>
        </View>
    )
}