import React from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import main from '../styles/main'
import { PlusOutlined } from '@ant-design/icons'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ item, username, onPress }) => {
    
    const { _id, price, title, desc, vendor, blurb, category, image } = item
    
    return (
        <View style={{
            borderBottomWidth: 1,
            borderBottomColor: '#000',
            paddingBottom: 10,
            marginBottom: 10,
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
            }}>
                {image ? (
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
                            source={{ uri: `${IMAGE_PATH}/${username}/thumb/${image.filename}` }}
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
                    }}
                >
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // marginBottom: 5,
                    }}>
                        <Text style={[main.subheading, {
                            flex: 1,
                            flexBasis: '70%',
                            flexShrink: 0,
                            flexGrow: 1,
                            marginTop: 4,
                        }]}>{title}</Text>

                        <TouchableOpacity
                            onPress={onPress}
                        >
                            <Text style={[main.text, {
                                flex: 1,
                                flexGrow: 1,
                                flexShrink: 1,
                                flexBasis: '30%',
                                textAlign: 'right',
                                backgroundColor: '#00f',
                                borderRadius: 10,
                                paddingVertical: 2,
                                paddingHorizontal: 7,
                                color: '#fff',
                            }]}>
                                ${price} <PlusOutlined />
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {(blurb && blurb.length) ? <Text style={main.text}>{blurb}</Text> : null}
                </View>
                
            </View>

            <View>
                
                <Text style={[main.text, {
                    fontSize: 18,
                }]}>{desc}</Text>
            </View>
        </View>
    )
}