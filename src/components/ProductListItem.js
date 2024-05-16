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
    useModal,
    useProducts,
    useUser,
} from '@context'
import classes from '@styles/classes'
import Icon from 'react-native-vector-icons/Ionicons'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ onPress, product, ...props }) => {

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
                flexDirection: 'row',
                gap: 8,
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

            <View style={{ flexGrow: 1 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
                    <ThemedText bold size={16} style={{ flexGrow: 1, lineHeight: 24 }}>{product.title}</ThemedText>
                    <ThemedText bold size={16} style={{ flexGrow: 0, lineHeight: 24 }}>${Number(product.price).toFixed(2)}</ThemedText>
                </View>

                <ThemedText style={classes.productBlurb}>{product.blurb}</ThemedText>
                <ThemedText style={classes.textDefault}>{product.desc}</ThemedText>

            </View>

            <View
                style={{
                    justifyContent: 'flex-start',
                    gap: 5,
                }}
            >
                <Pressable
                    onPress={() => setModal('PRODUCT', product)}
                    disabled={productsLoading}
                >
                    <Icon name='create-outline' size={22} />
                </Pressable>
                <Pressable
                    onPress={() => setModal('DELETE_PRODUCT', product._id)}
                    disabled={productsLoading}
                >
                    <Icon name='trash-outline' size={20} />
                </Pressable>
            </View>

        </View>
    )
}