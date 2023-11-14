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
                paddingVertical: 10,
            }}
        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                }}
            >
                {product.image ? (
                    <View
                        style={{
                            paddingRight: 10,
                            marginBottom: 10,
                            flexBasis: 'auto',
                            flexGrow: 0,
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
                        // width: '100%',
                        flexBasis: 'auto',
                        flexGrow: 1,
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
                            }
                        ]}>
                            {product.title}
                        </Text>

                        <Text style={[
                            main.text,
                            {
                                flex: 1,
                                flexBasis: '20%',
                                textAlign: 'right',
                                fontSize: 18,
                                fontWeight: 700,
                                color: '#666',
                                flexBasis: 'auto',
                                flexGrow: 0,
                            }
                        ]}>
                            ${product.price}
                        </Text>

                    </View>
                    <Text style={main.text}>{product.blurb}</Text>
                </View>
                
            </View>
            <Text style={main.text}>{product.desc}</Text>

            
        </Pressable>
    )
}