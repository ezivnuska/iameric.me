import React, { useContext, useState } from 'react'
import {
    FlatList,
    Image,
    Text,
    View,
} from 'react-native'
import {
    IconButton,
} from '.'
import { AppContext } from '../AppContext'
import classes from '../styles/classes'
import axios from 'axios'

const IMAGE_SIZE = 24
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ order }) => (
    <FlatList
        data={order.items}
        listKey={() => 'order-items'}
        keyExtractor={(item, index) => 'order-item-key' + index}
        renderItem={({ item, index }) => (
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomWidth: 1,
                    borderBottomColor: '#333',
                    paddingBottom: 8,
                    marginBottom: 7,
                    // borderColor: 'yellow',
                }}
            >
                <View style={{
                    flexBasis: 'auto',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    // borderWidth: 1,
                    // borderColor: 'red',
                }}>
                    <View
                        style={{
                            flexBasis: 'auto',
                            flexGrow: 0,
                            flexShrink: 0,
                            paddingRight: 10,
                        }}
                    >
                        <Image
                            width={IMAGE_SIZE}
                            height={IMAGE_SIZE}
                            source={{ uri: `${IMAGE_PATH}/${item.vendor.username}/thumb/${item.image.filename}` }}
                            style={{
                                resizeMode: 'cover',
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
                        
                    <Text
                        style={[
                            { flexBasis: 'auto', flexGrow: 1 },
                            classes.textDefault,
                        ]}
                    >
                        {item.title}
                    </Text>
                </View>
        
                <Text
                    style={[
                        classes.textDefault,
                        {
                            flexBasis: 'auto',
                            flexGrow: 0,
                            flexShrink: 0,
                            textAlign: 'left',
                        },
                    ]}
                >
                    ${item.price}
                </Text>
            </View>
        )}
        style={{
            marginTop: 10,
        }}
    />
)