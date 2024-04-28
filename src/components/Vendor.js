import React, { useEffect } from 'react'
import {
    View,
} from 'react-native'
import {
    EmptyStatus,
    IconButton,
    Menu,
    TitleBar,
} from '@components'
import {
    useApp,
    useContacts,
} from '@context'
import { loadVendor } from '@utils/contacts'

export default ({ id, onPress }) => {
    const { theme } = useApp()

    const {
        contact,
        contactLoading,
        setContactLoading,
        setContact,
    } = useContacts()
    
    useEffect(() => {
        const init = async () => {
            setContactLoading(true)
            const vendor = await loadVendor(id)
            setContactLoading(false)
            if (!vendor) console.log('error loading vendor')
            else {
                setContact(vendor)
            }
        }
        if (!contact) init()
    }, [])

    return contact ? (
        <View>
            <TitleBar title={contact.username || 'Restaurant'}>
                <IconButton
                    label='Return to Vendors'
                    onPress={onPress}
                    disabled={contactLoading}
                    textStyles={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: theme?.colors.textDefault,
                    }}
                    outline
                    transparent
                />
            </TitleBar>
            <Menu
                loading={contactLoading}
                vendor={contact}
            />
        </View>
    ) : <EmptyStatus status='No vendor set' />
} 