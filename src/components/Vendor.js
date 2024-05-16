import React, { useEffect, useState } from 'react'
import {
    FlatList,
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    EmptyStatus,
    IconButton,
    LoadingView,
    ScreenContent,
    ThemedText,
    TitleBar,
} from '@components'
import {
    useApp,
    useCart,
    useContacts,
    useModal,
} from '@context'
import { loadVendor } from '@utils/contacts'
import classes from '@styles/classes'
import Icon from 'react-native-vector-icons/Ionicons'
import CenterVertical from './CenterVertical'
import SimpleButton from './SimpleButton'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const MenuItem = ({ item, username }) => {
    
    const { price, title, blurb, image } = item

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
                    source={{ uri: `${IMAGE_PATH}/${username}/${image.filename}` }}
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

export default ({ id, onPress }) => {
    const { theme, userId } = useApp()
    const { addToCart, itemPending, setItemPending } = useCart()
    const {
        contactsLoading,
        setContactsLoading,
        updateContact,
    } = useContacts()

    const [contact, setContact] = useState(null)
    
    useEffect(() => {
        const init = async () => {
            setContactsLoading(true)
            const vendor = await loadVendor(id)
            setContactsLoading(false)
            if (!vendor) console.log('error loading vendor')
            else {
                setContact(vendor)
                updateContact(vendor)
            }
        }
        init()
    }, [])

    useEffect(() => {
        if (userId && itemPending) {
            addToCart(itemPending.item, itemPending.quantity)
            setItemPending(null)
        }
    }, [userId])

    if (contactsLoading) return <LoadingView loading='Loading vendor...' />

    return contact ? (
        <View>
            <TitleBar title={contact.username || 'Restaurant'}>
                <IconButton
                    label='Browse Vendors'
                    onPress={onPress}
                    disabled={contactsLoading}
                    textStyles={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: theme?.colors.textDefault,
                    }}
                    transparent
                />
            </TitleBar>
            
            <ScreenContent padded={false}>
                {contact.products
                    ? (
                        <FlatList
                            data={contact.products}
                            keyExtractor={item => `product-${item._id}`}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <MenuItem
                                    item={item}
                                    username={item.vendor.username}
                                />
                            )}
                        />
                    )
                    : <EmptyStatus status='No products listed.' />}
            </ScreenContent>
        </View>
    ) : <EmptyStatus status='Loading vendor...' />
} 