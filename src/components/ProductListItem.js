import React, { useContext } from 'react'
import {
    Image,
    Pressable,
    Text,
    View,
} from 'react-native'
import {
    DefaultText,
} from '@components'
import { AppContext } from '../AppContext'
import classes from '../styles/classes'
import { useTheme } from 'react-native-paper'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ product, onDelete, onPress, ...props }) => {

    const {
        user,
    } = useContext(AppContext)
    
    const theme = useTheme()

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
                        }}
                    >
                        
                        <DefaultText
                            style={[
                                classes.headerSecondary,
                                {
                                    flexBasis: 'auto',
                                    flexGrow: 1,
                                    flexBasis: '80%',
                                }
                            ]}
                        >
                            {product.title}
                        </DefaultText>

                        <DefaultText
                            style={{
                                flexBasis: '20%',
                                textAlign: 'right',
                                flexGrow: 0,
                            }}
                        >
                            ${product.price}
                        </DefaultText>

                    </View>
                    
                    <DefaultText>{product.blurb}</DefaultText>
                    <DefaultText>{product.desc}</DefaultText>

                </View>
            </View>
        </Pressable>
    )
}