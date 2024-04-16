import React, { useEffect, useMemo } from 'react'
import {
    IconButton,
    Menu,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'
import {
    useApp,
    useContacts,
} from '@context'
import { loadContact, loadUserProducts } from '@utils/contacts'
import { loadImages } from '@utils/images'

export default ({ navigation }) => {

    const { theme } = useApp()
    const {
        contact,
        contacts,
        contactsLoading,
        setContactsLoading,
        updateContact,
        updateContactProducts,
    } = useContacts()
    
    const {
        _id,
        images,
        username,
    } = useMemo(() => contact, [contact])
    
    useEffect(() => {
        let loadedContact = contact
        const init = async () => {
            const images = await loadImages(_id)
            console.log('images', images)
            if (images) {
                loadedContact = {
                    ...loadedContact,
                    images,
                }
            }
            updateContact(loadedContact)
        }
        init()
    }, [])

    useEffect(() => {
        if (contact) {
            if (!contact.products) {
                initProducts()
            }
        }
    }, [contact])

    const initProducts = async () => {
        setContactsLoading(true)
        const { data } = await loadUserProducts(_id)
        setContactsLoading(false)
        if (data) {
            updateContactProducts(data.products)
        } else {
            console.log('could not load user products')
        }
    }

    return (
        <Screen
            titleComponent={
                <ScreenTitle
                    title={contact?.username || 'Restaurant'}
                >
                    <IconButton
                        label='Return to Vendors'
                        onPress={() => navigation.reset({
                            index: 0,
                            routes: [{ name: 'VendorList' }],
                        })}
                        disabled={contactsLoading}
                        textStyles={{
                            fontSize: 16,
                            fontWeight: 400,
                            color: theme?.colors.textDefault,
                        }}
                        outline
                        transparent
                    />
                </ScreenTitle>
            }
        >
            {contact ? (
                <Menu
                    loading={contactsLoading}
                    vendor={contact}
                />
            ) : null}
        </Screen>
    )
}