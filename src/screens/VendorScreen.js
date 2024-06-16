import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import {
    EmptyStatus,
    IconButton,
    LoadingView,
    TitleBar,
    Vendor,
    Screen,
} from '@components'
import {
    useApp,
    useContacts,
} from '@context'
import { loadVendor } from '@utils/contacts'
import { classes } from '@styles'

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

    // useEffect(() => {
    //     const init = async () => {
    //         setContactsLoading(true)
    //         const vendor = await loadVendor(id)
    //         setContactsLoading(false)
    //         if (vendor) {
    //             setContact(vendor)
    //             updateContact(vendor)
    //         }
    //     }
    //     if (contact && contact._id !== id) init()
    // }, [id])
    
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
            
            <View style={classes.paddingH}>
                {
                    contact
                        ? <Vendor vendor={contact} />
                        : contactsLoading
                            ? <LoadingView loading='Loading vendor...' />
                            : <EmptyStatus status='No vendor found.' />
                }
            </View>
        </Screen>
    )
}