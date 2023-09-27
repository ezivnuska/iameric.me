import React from 'react'
import {
    Text,
    View,
} from 'react-native'
import {
    ButtonPrimary,
} from '.'
import { Button } from 'antd'
import main from '../styles/main'

const ProductDetails = ({ product, onOrder }) => product ? (
    <>
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

                {
                product.blurb
                &&
                <Text style={[main.text, { fontWeight: 600 }]}>{product.blurb}</Text>
                }

                <Text style={[main.text]}>{product.desc}</Text>

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
    </>
) : null

export default ProductDetails