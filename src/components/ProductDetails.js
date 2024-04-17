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
import { getImageDims } from '@utils/images'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default () => {

    const { dims, isLandscape, theme } = useApp()
    const { addToCart } = useCart()
    const { closeModal, data } = useModal()

    const [imageDims, setImageDims] = useState(null)
    
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        if (data)
            setImageDims(getImageDims(data.image.width, data.image.height, dims))
    }, [])

    useEffect(() => {
        if (dims && data)
            setImageDims(getImageDims(data.image.width, data.image.height, dims))
    }, [dims])

    const onProductAdded = (product, quantity) => {
        addToCart(product, quantity)
        closeModal()
    }

    return data ? (
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
                            uri: `${IMAGE_PATH}/${data.vendor.username}/${data.image.filename}`
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
                                {data.title}
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
                                ${data.price}
                            </ThemedText>
                        </View>
                            
                        <ThemedText>
                            {data.blurb}
                        </ThemedText>
                        
                        <ThemedText>
                            {data.desc}
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
                                label={`${quantity > 1 ? `${quantity} ` : ''} ($${Number(Number(data.price) * quantity).toFixed(2)})`}
                                onPress={() => onProductAdded(data, quantity)}
                                textStyles={{ color: theme?.colors.buttonLabel, wrap: 'nowrap', lineHeight: 35, }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    ) : null
}