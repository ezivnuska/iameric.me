import React, { useEffect, useState } from 'react'
import {
    FlatList,
    Image,
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
    useContacts,
    useModal,
} from '@context'
import { loadVendor } from '@utils/contacts'
import classes from '@styles/classes'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const MenuItem = ({ item, username }) => {
    
    const { price, title, blurb, image } = item

    const { setModal } = useModal()

    return (
        <View
            style={{
                marginBottom: 15,
            }}
        >
            {image && (
                <Image
                    // width='100%'
                    // height='100'
                    source={{ uri: `${IMAGE_PATH}/${username}/${image.filename}` }}
                    style={{
                        resizeMode: 'cover',
                        width: '100%',
                        height: 120,
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
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                }}
            >
                <ThemedText size={18} bold>{title}</ThemedText>
                <ThemedText size={18} bold>${price}</ThemedText>
            </View>
            
            {(blurb && blurb.length) ? (
                <ThemedText
                    style={classes.productBlurb}
                >
                    {blurb}
                </ThemedText>
            ) : null}

            <IconButton
                onPress={() => setModal('SHOW_PRODUCT', item)}
                type='primary'
                label='Add to Cart'
                align='center'
                // padded={landscape ? true : false}
                // textStyles={{ lineHeight: 35 }}
            />
        </View>
    )
}

export default ({ id, onPress }) => {
    const { theme } = useApp()

    const {
        // contact,
        contactLoading,
        setContactLoading,
        updateContact,
        // setContact,
    } = useContacts()

    const [contact, setContact] = useState(null)
    
    useEffect(() => {
        const init = async () => {
            setContactLoading(true)
            const vendor = await loadVendor(id)
            setContactLoading(false)
            if (!vendor) console.log('error loading vendor')
            else {
                setContact(vendor)
                updateContact(vendor)
            }
        }
        // if (!contactLoading)
        init()
    }, [])

    if (contactLoading) return <LoadingView loading='Loading Vendor...' />

    return contact ? (
        <View>
            <TitleBar title={contact.username || 'Restaurant'}>
                <IconButton
                    label='Browse Vendors'
                    onPress={onPress}
                    disabled={contactLoading}
                    textStyles={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: theme?.colors.textDefault,
                    }}
                    transparent
                />
            </TitleBar>
            <ScreenContent>
                {contact.products
                    ? (
                        <FlatList
                            data={contact.products}
                            keyExtractor={item => `product-${item._id}`}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <MenuItem
                                    item={item}
                                    username={contact.username}
                                />
                            )}
                        />
                    )
                    : <EmptyStatus status='No products listed.' />}
            </ScreenContent>
        </View>
    ) : <EmptyStatus status='No vendor set' />
} 