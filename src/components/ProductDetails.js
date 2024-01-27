import React, { useState } from 'react'
import {
    Image,
    Pressable,
    Text,
    View,
} from 'react-native'
import {
    IconButton,
} from '.'
import { Button } from 'antd'
import main from '../styles/main'
import classes from 'src/styles/classes'
import Icon from 'react-native-vector-icons/Ionicons'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const QuantityControl = ({ value, onChange }) => {
    
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
                borderColor: '#fff',
                borderRadius: 10,
                marginVertical: 15,
                marginHorizontal: 'auto',
            }}
        >
            <IconButton
                iconName='remove-outline'
                onPress={decrease}
                disabled={value < 2}
                style={{ flex: 1 }}
            />
    
            <Text
                style={[
                    classes.textDefault,
                    classes.bold,
                    {
                        flex: 1,
                        textAlign: 'center'
                    }
                ]}
            >
                {value}
            </Text>
    
            <IconButton
                iconName='add-outline'
                onPress={increase}
                style={{ flex: 1 }}
            />
    
        </View>
    )
}

export default ({ product, onOrder }) => {

    const [quantity, setQuantity] = useState(1)

    return product ? (
        <View>

            {product.image ? (
                <View
                    style={{
                        marginBottom: 10,
                        flexBasis: 'auto',
                    }}
                >
                    <Image
                        width={product.image.width}
                        height={product.image.height}
                        source={{ uri: `${IMAGE_PATH}/${product.vendor.username}/${product.image.filename}` }}
                        style={{
                            resizeMode: 'center',
                            width: product.image.width,
                            height: product.image.height,
                            borderWidth: 1,
                        }}
                    />
                </View>
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
                        
                        <Text
                            style={[
                                classes.defaultText,
                                {
                                    fontSize: 18,
                                    fontWeight: 700,
                                    flexBasis: 'auto',
                                    flexGrow: 1,
                                    flexBasis: '80%',
                                    color: '#fff',
                                }
                            ]}
                        >
                            {product.title}
                        </Text>
    
                        <Text style={[
                            main.text,
                            {
                                flexBasis: '20%',
                                textAlign: 'right',
                                fontSize: 18,
                                fontWeight: 700,
                                color: '#fff',
                                flexGrow: 0,
                            }
                        ]}>
                            ${product.price}
                        </Text>
    
                    </View>
                </View>
            </View>
            <Text style={[main.text, { color: '#fff' }]}>{product.blurb}</Text>
            <Text style={[main.text, { color: '#fff' }]}>{product.desc}</Text>
            
            <QuantityControl
                value={quantity}
                onChange={value => setQuantity(value)}
            />
    
            <IconButton
                label={`Add ${quantity > 1 ? `${quantity} ` : ''}to Cart ($${Number(product.price) * quantity})`}
                // iconName='add-outline'
                bgColor='blue'
                onPress={() => onOrder(product, quantity)}
            />

        </View>
    ) : null
}