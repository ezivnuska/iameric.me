import React, { useEffect, useState } from 'react'
import {
    Image,
    View,
} from 'react-native'
import {
    ThemedText,
    IconButton,
    QuantityControl,
} from '.'
import {
    useApp,
    useCart,
    useModal,
} from '@context'
import { getMaxImageDims } from '@utils/images'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ product }) => {

    const {
        dims,
        landscape,
        theme,
        userId,
    } = useApp()
    const { addToCart, itemPending, setItemPending } = useCart()
    const { closeModal, setModal } = useModal()

    const [imageDims, setImageDims] = useState(null)
    
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        setImageDims(getMaxImageDims(product.image.width, product.image.height, dims))
    }, [])

    useEffect(() => {
        if (dims) setImageDims(getMaxImageDims(product.image.width, product.image.height, dims))
    }, [dims])

    const onProductAdded = (item, quantity) => {
        if (!userId) {
            setItemPending({ item, quantity })
            setModal('SIGN_IN')
        } else {
            addToCart(item, quantity)
            closeModal()
        }
    }

    const renderHeader = () => (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
            }}
        >
            
            <ThemedText
                bold
                style={{
                    // fontSize: 18,
                    // fontWeight: 700,
                    flexBasis: 'auto',
                    flexGrow: 1,
                    // flexBasis: 'auto',
                }}
            >
                {product.title}
            </ThemedText>

            <ThemedText
                bold
                style={{
                    flexBasis: 'auto',
                    // textAlign: 'right',
                    // fontSize: 18,
                    // fontWeight: 700,
                    flexShrink: 1,
                }}
            >
                ${product.price}
            </ThemedText>
        </View>
    )

    return (
        <View
            style={{
                width: '100%',
                minWidth: 280,
                // maxWidth: landscape ? 600 : 300,
                marginVertical: 50,
            }}
        >
            <View
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: landscape ? 'row' : 'column',
                    justifyContent: landscape ? 'flex-start' : 'center',
                    gap: 15,
                }}
            >
                <View
                    style={{
                        flexBasis: 'auto',
                        marginHorizontal: 10,
                    }}
                >
                    {renderHeader()}
                    
                    <View
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <Image
                            source={{
                                uri: `${IMAGE_PATH}/${product.vendor.username}/${product.image.filename}`
                            }}
                            style={{
                                width: '100%',
                                height: product.image.height,
                                resizeMode: 'cover',
                            }}
                        />
                    </View>
                </View>

                <View
                    style={{
                        flex: 1,
                        marginHorizontal: 10,
                    }}
                >
                    <View>
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
                                onChange={setQuantity}
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
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}