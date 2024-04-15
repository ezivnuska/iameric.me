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
import { loadUser, loadUserProducts } from '@utils/data'

export default ({ navigation, route }) => {
    
    const { id } = route.params

    const { theme } = useApp()
    const {
        contacts,
        contactsLoading,
        setContactsLoading,
        updateContact,
        updateContactProducts,
    } = useContacts()
    
    const currentUser = useMemo(() => {
        return contacts.map(contact => contact._id === id)[0]
    }, [contacts, id])
    
    useEffect(() => {
        const init = async () => {
            setContactsLoading(true)
            const { data } = await loadUser(id)
            setContactsLoading(false)
            if (!data) console.log('no user could be loaded')
            else updateContact(user)
        }
        init()
    }, [])

    useEffect(() => {
        if (currentUser) {
            if (!currentUser.products) {
                initProducts()
            }
        }
    }, [currentUser])

    const initProducts = async () => {
        setContactsLoading(true)
        const { data } = await loadUserProducts(currentUser._id)
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
                    title={currentUser?.username || 'Restaurant'}
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
            {currentUser ? (
                <Menu
                    loading={contactsLoading}
                    vendor={currentUser}
                />
            ) : null}
        </Screen>
    )
}