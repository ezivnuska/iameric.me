import React, { useContext } from 'react'
import {
    Image,
    Pressable,
    Text,
    View,
} from 'react-native'
import {
    IconButton,
    ThemedText,
} from '@components'
import { AppContext } from '../AppContext'
import classes from '../styles/classes'
// import { useTheme } from 'react-native-paper'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ onDelete, product, onPress, ...props }) => {

    const {
        loading,
        user,
    } = useContext(AppContext)
    
    // const theme = useTheme()

    return product ? (
        <Pressable
            {...props}
            onPress={() => onPress(product)}
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
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 2,
                        }}
                    >
                        
                        <ThemedText
                            style={[
                                classes.productTitle,
                                {
                                    flexBasis: 'auto',
                                    flexGrow: 1,
                                    flexBasis: '80%',
                                }
                            ]}
                        >
                            {product.title}
                        </ThemedText>

                        <ThemedText
                            style={{
                                flexBasis: '20%',
                                textAlign: 'right',
                                flexGrow: 0,
                            }}
                            bold
                        >
                            ${product.price}
                        </ThemedText>

                    </View>
                    
                    <ThemedText>{product.blurb}</ThemedText>
                    <ThemedText>{product.desc}</ThemedText>

                </View>

                <IconButton
                    iconName='trash-outline'
                    transparent
                    // type='danger'
                    // label='Delete Product'
                    onPress={onDelete}
                    disabled={loading}
                    style={{ marginBottom: 10 }}
                />
            </View>
        </Pressable>
    ) : null
}