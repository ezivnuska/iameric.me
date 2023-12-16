import React from 'react'
import {
    Image,
    Text,
    View,
} from 'react-native'
// import {
//     LoadingView,
// } from '.'
import { Button } from 'antd'
import main from '../styles/main'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ product, onOrder }) => product ? (
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
                        resizeMode: 'stretch',
                        width: product.image.width,
                        height: product.image.height,
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
                            main.text,
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

        <Button
            size='large'
            type='primary'
            onClick={() => onOrder(product)}
            style={{
                color: '#fff',
                backgroundColor: '#161',
            }}
        >
            Add to Cart
        </Button>
    </View>
) : null