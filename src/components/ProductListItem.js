import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    Pressable,
    Text,
    View,
} from 'react-native'
import main from '../styles/main'
import { AppContext } from '../AppContext'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ product, onDelete, onPress, ...props }) => {

    const {
        user,
    } = useContext(AppContext)
    
    return (
        <Pressable
            {...props}
            onPress={onPress}
            style={{
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                paddingBottom: 10,
            }}
        >
            <View
                style={{

                    display: 'flex',
                    flexDirection: 'row',
                    // justifyContent: 'space-between',
                }}
            >
                {product.image ? (
                    <View
                        style={{
                            marginBottom: 10,
                            flexBasis: IMAGE_SIZE + 10,
                        }}
                    >
                        <Image
                            width={IMAGE_SIZE}
                            height={IMAGE_SIZE}
                            source={{ uri: `${IMAGE_PATH}/${user.username}/thumb/${product.image.filename}` }}
                            style={{
                                resizeMode: 'stretch',
                                width: IMAGE_SIZE,
                                height: IMAGE_SIZE,
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
                        flexBasis: 'auto',
                        flexGrow: 1,
                        flexShrink: 1,
                    }}
                >
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        
                        <Text style={[
                            main.text,
                            {
                                fontSize: 18,
                                fontWeight: 700,
                                flexBasis: 'auto',
                                flexGrow: 1,
                                flexBasis: '80%',
                            }
                        ]}>
                            {product.title}
                        </Text>

                        <Text style={[
                            main.text,
                            {
                                flexBasis: '20%',
                                textAlign: 'right',
                                fontSize: 18,
                                fontWeight: 700,
                                color: '#666',
                                flexGrow: 0,
                            }
                        ]}>
                            ${product.price}
                        </Text>

                    </View>
                    <Text style={main.text}>{product.blurb}</Text>
                    <Text style={main.text}>{product.desc}</Text>
                </View>
            </View>
            
            
        </Pressable>
    )
}