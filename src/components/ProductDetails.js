import React from 'react'
import {
    Text,
    View,
} from 'react-native'
import {
    LoadingView,
} from '.'
import { Button } from 'antd'
import main from '../styles/main'

const ProductDetails = ({ loading, product, onOrder }) => product
    ?
    !loading
    ? (
        <View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginBottom: 10,
            }}>

                <View style={{
                    flexBasis: 'auto',
                    flexGrow: 1,
                }}>

                    {product.blurb ?
                        <Text style={[main.text, { fontWeight: 600 }]}>{product.blurb}</Text>
                        : null
                    }

                    {product.desc ? 
                        <Text style={[main.text]}>{product.desc}</Text>
                        : null
                    }

                </View>

                <View style={{
                    flexBasis: 'auto',
                    flexGrow: 0,
                    textAlign: 'right',
                }}>
                    <Text style={[main.text, { fontWeight: 600 }]}>${product.price}</Text>
                </View>
                
            </View>

            <Button
                type='primary'
                onClick={() => onOrder(product)}
            >
                Add to Cart
            </Button>
        </View>
    )
    :
    <LoadingView label='Adding Item...' />
    : null

export default ProductDetails