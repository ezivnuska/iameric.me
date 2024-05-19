import React, { useState } from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    CenterVertical,
    SimpleButton,
    ThemedText,
} from '@components'
import {
    useApp,
    useCart,
    useModal,
} from '@context'
import Icon from 'react-native-vector-icons/Ionicons'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ item }) => {
    
    const { price, title, blurb, image, vendor } = item

    const { theme, userId } = useApp()
    const { addToCart, setItemPending } = useCart()
    const { setModal } = useModal()

    const [quantity, setQuantity] = useState(1)

    const handleItemAdded = () => {
        if (userId) addToCart(item, quantity)
        else {
            setItemPending({ item, quantity })
            setModal('SIGN_IN')
        }
    }

    return (
        <View
            style={{
                flexDirection: 'row',
                gap: 10,
                borderBottomWidth: 1,
                borderBottomColor: theme?.colors.border,
            }}
        >
            
            {image && (
                <Image
                    // width='100%'
                    // height='100'
                    source={{ uri: `${IMAGE_PATH}/${vendor.username}/${image.filename}` }}
                    style={{
                        flex: 6,
                        resizeMode: 'cover',
                        width: '100%',
                        height: 100,
                        // borderWidth: 1,
                        // borderColor: '#999',
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
                    flex: 6,
                    paddingTop: 2,
                    paddingBottom: 10,
                    justifyContent: 'space-between',
                }}
            >
                <ThemedText size={16} style={{ lineHeight: 20 }}>{title} ${price}</ThemedText>
                
                <SimpleButton
                    label='Add to Order'
                    onPress={() => handleItemAdded(item, quantity)}
                />
            </View>
            
            <View style={{ flex: 1, alignItems: 'center', marginRight: 10 }}>
                <CenterVertical>
                    <Pressable onPress={() => setModal('SHOW_PRODUCT', item)}>
                        <Icon name='ellipsis-horizontal-outline' size={24} color={theme?.colors.textDefault} />
                    </Pressable>
                </CenterVertical>
            </View>

        </View>
    )
}