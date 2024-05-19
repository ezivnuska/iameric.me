import React, { useEffect, useState } from 'react'
import {
    EmptyStatus,
    IconButton,
    LoadingView,
    ScreenContent,
    TitleBar,
    Vendor,
} from '@components'
import { Screen } from '.'
import {
    useApp,
    useContacts,
} from '@context'
import { loadVendor } from '@utils/contacts'

export default ({ onPress, ...props }) => {

    const { navigation, route } = props
    const { id } = route.params

    const { theme } = useApp()
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
            if (vendor) {
                setContact(vendor)
                updateContact(vendor)
            }
        }
        init()
    }, [])
    
    return (
        <Screen secure={false} {...props}>
            <TitleBar title={contact ? contact.username : 'Restaurant'}>
                <IconButton
                    label='Browse Vendors'
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
                    transparent
                />
            </TitleBar>
            
            <ScreenContent padded={false}>
                {
                    contact
                        ? <Vendor vendor={contact} />
                        : contactsLoading
                            ? <LoadingView loading='Loading vendor...' />
                            : <EmptyStatus status='No vendor found.' />
                }
            </ScreenContent>
        </Screen>
    )
}