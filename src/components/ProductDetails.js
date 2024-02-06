import React, { useState } from 'react'
import {
    Image,
    View,
} from 'react-native'
import {
    DefaultText,
    IconButton,
} from '.'
import { useTheme } from 'react-native-paper'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const QuantityControl = ({ value, onChange }) => {

    const theme = useTheme()
    
    const increase = () => {onChange(value + 1)}
    const decrease = () => onChange(value - 1)

    return (
        <View
            style={{
                width: 150,
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
                }}
                transparent
            />
    
            <DefaultText
                style={{
                    flex: 1,
                    textAlign: 'center',
                    fontWeight: 700,
                }}
            >
                {value}
            </DefaultText>
    
            <IconButton
                iconName='add-outline'
                onPress={increase}
                style={{
                    flex: 1,
                    borderLeftWidth: 1,
                    borderColor: theme?.colors.textDefault,
                    borderRadius: 'none',
                }}
                transparent
            />
    
        </View>
    )
}

export default ({ product, onOrder }) => {

    const theme = useTheme()

    const [quantity, setQuantity] = useState(1)

    return product ? (
        <View>

            {product.image ? (
                <Image
                    width={product.image.width}
                    height={product.image.height}
                    source={{
                        uri: `${IMAGE_PATH}/${product.vendor.username}/${product.image.filename}`
                    }}
                    style={{
                        marginBottom: 20,
                        marginHorizontal: 'auto',
                        flexBasis: 'auto',
                        width: product.image.width,
                        height: product.image.height,
                        resizeMode: 'center',
                        borderWidth: 1,
                        borderColor: theme?.colors.border,
                    }}
                />
            ) : null}
    
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
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
                        
                        <DefaultText
                            style={{
                                fontSize: 18,
                                fontWeight: 700,
                                flexBasis: 'auto',
                                flexGrow: 1,
                                flexBasis: '80%',
                            }}
                        >
                            {product.title}
                        </DefaultText>
    
                        <DefaultText
                            style={{
                                flexBasis: '20%',
                                textAlign: 'right',
                                fontSize: 18,
                                fontWeight: 700,
                                flexGrow: 0,
                            }}
                        >
                            ${product.price}
                        </DefaultText>
    
                    </View>
                </View>
            </View>
            
            <DefaultText>
                {product.blurb}
            </DefaultText>
            
            <DefaultText>
                {product.desc}
            </DefaultText>
            
            <QuantityControl
                value={quantity}
                onChange={value => setQuantity(value)}
            />
    
            <IconButton
                type='primary'
                label={`Add ${quantity > 1 ? `${quantity} ` : ''}to Cart ($${Number(Number(product.price) * quantity).toFixed(2)})`}
                // iconName='add-outline'
                onPress={() => onOrder(product, quantity)}
            />

        </View>
    ) : null
}