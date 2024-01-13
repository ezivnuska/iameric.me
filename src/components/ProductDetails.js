import React from 'react'
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

        <IconButton
            label='Add to Cart'
            iconName='add-outline'
            bgColor='blue'
            onPress={() => onOrder(product)}
        />
        {/* <Pressable
            onPress={() => onOrder(product)}
            style={{
                flexBasis: 'auto',
                flexShrink: 1,
                flexGrow: 0,
                backgroundColor: 'blue',
                borderRadius: 6,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                // width: 'auto',
                paddingHorizontal: 5,
                marginVerical: 10,
            }}
        >
            <Icon
                name='add-outline'
                size={16}
                color='#fff'
                style={[{ flexBasis: 'auto', flexShrink: 1 }]}
            />
            <Text
                style={[classes.buttonText, { flexBasis: 'auto', flexShrink: 1 }]}
            >
                Add to Cart
            </Text>
        </Pressable> */}

        {/* <Button
            size='large'
            type='primary'
            onClick={() => onOrder(product)}
            style={{
                color: '#fff',
                backgroundColor: '#161',
            }}
        >
            Add to Cart
        </Button> */}
    </View>
) : null