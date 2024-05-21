import React from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    ThemedText,
} from '@components'
import {
    useApp,
    useModal,
    useProducts,
    useUser,
} from '@context'
import { classes } from '@styles'
import Icon from 'react-native-vector-icons/Ionicons'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ onPress, product, ...props }) => {

    const { theme } = useApp()
    const { setModal } = useModal()
    const { productsLoading } = useProducts()
    const { profile } = useUser()

    const getSource = filename => profile
        ? `${IMAGE_PATH}/${profile.username}/thumb/${filename}`
        : `${IMAGE_PATH}/avatar-default-small.png`

    return (
        <View
            {...props}
            style={{
                width: '100%',
                paddingLeft: 10,
                paddingRight: 5,
                paddingBottom: 10,
                marginBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
            }}
        >
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    flexWrap: 'nowrap',
                    gap: 8,
                    marginBottom: 10,
                }}
            >
                
                {product.image && (
                    <Image
                        width={IMAGE_SIZE}
                        height={IMAGE_SIZE}
                        source={{ uri: getSource(product.image.filename) }}
                        style={{
                            flexBasis: 'auto',
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
                )}

                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flexShrink: 1,
                        gap: 8,
                    }}
                >

                    <View
                        style={{
                            flexShrink: 1,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            gap: 7,
                        }}
                    >
                        <ThemedText size={16} style={{ fontWeight: 500, lineHeight: 22 }}>{product.title}</ThemedText>
                        <ThemedText size={16} style={{ fontWeight: 500, lineHeight: 22 }}>${Number(product.price).toFixed(2)}</ThemedText>
                    </View>

                    <View
                        style={{
                            flexBasis: 'auto',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            gap: 10,
                            marginTop: -1,
                        }}
                    >
                        <Pressable
                            onPress={() => setModal('PRODUCT', product)}
                            disabled={productsLoading}
                        >
                            <Icon
                                name='create-outline'
                                color={theme?.colors.textDefault}
                                size={22}
                            />
                        </Pressable>
                        
                        <Pressable
                            onPress={() => setModal('DELETE_PRODUCT', product._id)}
                            disabled={productsLoading}
                        >
                            <Icon
                                name='trash-outline'
                                color={theme?.colors.textDefault}
                                size={20}
                            />
                        </Pressable>
                    </View>
                </View>

            </View>
        
            <View>
                <ThemedText style={[classes.productBlurb, { marginBottom: 5 }]}>{product.blurb}</ThemedText>
                <ThemedText style={classes.textDefault}>{product.desc}</ThemedText>
            </View>
        </View>
    )
}