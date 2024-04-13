import React, { useEffect, useState } from 'react'
import {
    Image,
    // useWindowDimensions,
    View,
} from 'react-native'
import {
    ThemedText,
    IconButton,
    QuantityControl,
} from '.'
import {
    // AppContext,
    useApp,
    useCart,
    useModal,
} from '@context'
import { getImageDims } from '@utils/images'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ product }) => {

    const { dims, isLandscape, theme } = useApp()
    const { addToCart } = useCart()
    const { closeModal } = useModal()

    // const dims = useWindowDimensions()

    // const {
        
    // } = useContext(AppContext)

    const [imageDims, setImageDims] = useState(null)
    
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        if (product)
            setImageDims(getImageDims(product.image.width, product.image.height, dims))
    }, [])

    useEffect(() => {
        if (dims && product)
            setImageDims(getImageDims(product.image.width, product.image.height, dims))
    }, [dims])

    const onProductAdded = (product, quantity) => {
        addToCart(product, quantity)
        closeModal()
    }

    return product ? (
        <View
            style={{
                width: '100%',
                minWidth: 280,
                maxWidth: isLandscape ? 600 : 300,
                marginHorizontal: 'auto',
            }}
        >
            <View
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: isLandscape ? 'row' : 'column',
                    justifyContent: isLandscape ? 'flex-start' : 'center',
                    gap: 15,
                }}
            >
                <View
                    style={{
                        flexBasis: 'auto',
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
                </View>

                <View
                    style={{
                        flex: 1,
                        marginHorizontal: 10,
                    }}
                >
                    <View>
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
                            
                        <ThemedText>
                            {product.blurb}
                        </ThemedText>
                        
                        <ThemedText>
                            {product.desc}
                        </ThemedText>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'stretch',
                            alignItems: 'center',
                            gap: 10,
                            marginVertical: 10,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                            }}
                        >
                            <QuantityControl
                                value={quantity}
                                onChange={value => setQuantity(value)}
                            />
                        </View>
                        <View
                            style={{
                                flex: 1,
                            }}
                        >
                            <IconButton
                                type='primary'
                                label={`${quantity > 1 ? `${quantity} ` : ''} ($${Number(Number(product.price) * quantity).toFixed(2)})`}
                                onPress={() => onProductAdded(product, quantity)}
                                textStyles={{ color: theme?.colors.buttonLabel, wrap: 'nowrap', lineHeight: 35, }}
                                // style={{ flex: 1 }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    ) : null
}