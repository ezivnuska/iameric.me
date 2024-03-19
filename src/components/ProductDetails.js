import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    useWindowDimensions,
    View,
} from 'react-native'
import {
    ThemedText,
    IconButton,
    LoadingView,
} from '.'
import { useTheme } from 'react-native-paper'
import { AppContext } from '../AppContext'
import { loadProduct } from '@utils/data'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const QuantityControl = ({ value, onChange }) => {

    const theme = useTheme()
    
    const increase = () => {onChange(value + 1)}
    const decrease = () => onChange(value - 1)

    return (
        <View
            style={{
                flex: 1,
                width: '100%',
                height: 35,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: theme?.colors.textDefault,
                borderRadius: 10,
                marginVertical: 15,
                marginHorizontal: 'auto',
            }}
        >
            <IconButton
                iconName='remove-outline'
                onPress={decrease}
                disabled={value < 2}
                style={{
                    flex: 1,
                    borderRightWidth: 1,
                    borderColor: theme?.colors.textDefault,
                    borderRadius: 'none',
                    height: 35,
                }}
                transparent
            />
    
            <ThemedText
                style={{
                    flex: 1,
                    textAlign: 'center',
                    fontWeight: 700,
                    lineHeight: 35,
                }}
            >
                {value}
            </ThemedText>
    
            <IconButton
                iconName='add-outline'
                onPress={increase}
                style={{
                    flex: 1,
                    borderLeftWidth: 1,
                    borderColor: theme?.colors.textDefault,
                    borderRadius: 'none',
                    height: 35,
                }}
                transparent
            />
    
        </View>
    )
}

export default ({ id }) => {

    const theme = useTheme()

    const dims = useWindowDimensions()

    const {
        dispatch,
        isLandscape,
        loading,
    } = useContext(AppContext)

    const [product, setProduct] = useState(null)

    const [imageDims, setImageDims] = useState(null)
    
    const [quantity, setQuantity] = useState(1)
    
    const getImageDims = (w, h) => {
        const maxHeight = isLandscape ? dims.height - 50 : dims.height / 2
        const maxWidth = isLandscape ? (dims.width * 0.4) - 20 : dims.width - 20
        console.log('maxWidth', maxWidth)
        console.log('maxHeight', maxHeight)
        let scale = 1
        let width = w
        let height = h
        if (w >= h) {// if landscape
            if (h >= maxHeight) {
                scale = maxHeight / height
                width *= scale
                height *= scale
            } 
            if (w >= maxWidth) {
                scale = maxWidth / width
                width *= scale
                height *= scale
            }
        } else {// if portrait
            if (w >= maxWidth) {
                scale = maxWidth / width
                width *= scale
                height *= scale
            }
            if (h >= maxHeight) {
                scale = maxHeight / height
                width *= scale
                height *= scale
            }
        }
        console.log('width/height', width, height)
        return { width, height }
    }

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const { data } = await loadProduct(dispatch, id)
        if (!data) return console.log('could not load product')
        else {
            console.log('loadedProduct', data)
            setProduct(data)
        }
    }

    useEffect(() => {
        if (product)
            setImageDims(getImageDims(product.image.width, product.image.height))
    }, [product])

    const addToCart = (item, quantity) => {
        dispatch({ type: 'ADD_TO_CART', product: item, quantity })
    }

    useEffect(() => {
        if (dims && product)
            setImageDims(getImageDims(product.image.width, product.image.height))
    }, [dims])

    // useEffect(() => {
    //     if (imageDims) {
    //         const { width, height } = imageDims
    //         console.log(width + 'x' + height)
    //         console.log('isLandscape', isLandscape)
    //     }
    // }, [imageDims])
    
    if (loading) return <LoadingView />

    return product ? (
        <View
            style={{
                // flex: 1,
                // flexGrow: 1,
                display: 'flex',
                flexDirection: isLandscape ? 'row' : 'column',
                justifyContent: isLandscape ? 'flex-start' : 'center',
                gap: 10,
                // flexWrap: 'nowrap',
                width: isLandscape ? '85%' : '100%',
                marginHorizontal: 'auto',
                marginVertical: 20,
                paddingHorizontal: isLandscape ? 0 : 10,
                // borderWidth: 1,
                // borderColor: 'green',
                // borderStyle: 'dotted',
            }}
        >
            {product.image ? (
                <View
                    style={{
                        // flex: 1,
                        flexBasis: 'auto',
                        flexGrow: isLandscape ? 0 : 1,
                        flexShrink: isLandscape ? 1 : 0,
                        // borderWidth: 1,
                        // backgroundColor: 'blue',
                    }}
                >
                    <Image
                        source={{
                            uri: `${IMAGE_PATH}/${product.vendor.username}/${product.image.filename}`
                        }}
                        style={{
                            marginHorizontal: 'auto',
                            flexBasis: 'auto',
                            width: imageDims ? imageDims.width : 0,
                            height: imageDims ? imageDims.height : 0,
                            resizeMode: 'center',
                            borderWidth: 1,
                            borderColor: theme?.colors.border,
                        }}
                    />
                
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: isLandscape ? 'column' : 'row',
                            justifyContent: isLandscape ? 'flex-start' : 'space-evenly',
                            gap: 10,
                        }}
                    >
                        <QuantityControl
                            value={quantity}
                            onChange={value => setQuantity(value)}
                        />
    
                        <IconButton
                            type='primary'
                            label={`${quantity > 1 ? `${quantity} ` : ''} ($${Number(Number(product.price) * quantity).toFixed(2)})`}
                            onPress={() => addToCart(product, quantity)}
                            textStyles={{ color: theme?.colors.buttonLabel, wrap: 'nowrap' }}
                            // style={{ flex: 1 }}
                        />
                    </View>
                </View>
            ) : null}

            <View
                style={{
                    flex: 1,
                    flexBasis: 'auto',
                    flexGrow: isLandscape ? 1 : 0,
                    flexShrink: isLandscape ? 1 : 0,
                    // flexDirection: 'column',
                    borderWidth: 1,
                    borderColor: 'red',
                    maxWidth: isLandscape ? '50%' : 'max-content',
                    minWidth: isLandscape ? '50%' : 'max-content',
                }}
            >
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: 10,
                    }}
                >
                    
                    <View
                        style={{
                            flexBasis: 'auto',
                            flexGrow: 1,
                            flexShrink: 1,
                        }}
                    >
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            
                            <ThemedText
                                style={{
                                    fontSize: 18,
                                    fontWeight: 700,
                                    flexBasis: 'auto',
                                    flexGrow: 1,
                                    flexBasis: '80%',
                                }}
                            >
                                {product.title}
                            </ThemedText>

                            <ThemedText
                                style={{
                                    flexBasis: '20%',
                                    textAlign: 'right',
                                    fontSize: 18,
                                    fontWeight: 700,
                                    flexGrow: 0,
                                }}
                            >
                                ${product.price}
                            </ThemedText>

                        </View>
                    </View>
                </View>
                
                <ThemedText>
                    {product.blurb}
                </ThemedText>
                
                <ThemedText>
                    {product.desc}
                </ThemedText>
            </View>
            

        </View>
    ) : null
}