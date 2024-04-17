import React, { useEffect, useState } from 'react'
import {
    IconButton,
    LoadingView,
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
import { loadVendor } from '@utils/contacts'

export default ({ navigation, route }) => {

    const idFromParams = route.params.id

    const { theme } = useApp()
    const {
        contactLoading,
        setContactLoading,
        updateContact,
    } = useContacts()
    const [contact, setContact] = useState(null)

    
    useEffect(() => {
        const init = async () => {
            setContactLoading(true)
            const vendor = await loadVendor(idFromParams)
            setContactLoading(false)
            if (!vendor) console.log('error loading vendor')
            else {
                setContact(vendor)
                updateContact(vendor)
            }
        }
        init()
    }, [])

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
                        disabled={contactLoading}
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
                <Menu vendor={contact} />
            ) : <LoadingView label='Loading vendor' />}

        </Screen>
    )
}