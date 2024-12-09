import React, { useEffect } from 'react'
import ContactView from './ContactView'
import { ActivityIndicator, DefaultText } from '@components'
import { useContacts, useModal } from '@context'

const ContactContainer = props => {

    const {
        contact,
        contactLoading,
        initContact,
    } = useContacts()
    
    const { setModal } = useModal()

    useEffect(() => {
        if (!contact || contact.username !== props.route.params?.username) {
            initContact(props.route.params.username)
        }
    }, [contact])

    return contactLoading
        ? <ActivityIndicator size='medium' label='Loading Contact...' />
        : contact
            ? (
                <ContactView
                    {...props}
                    contact={contact}
                    showImage={() => setModal('SHOWCASE', contact.profileImage)}
                    showContact={() => props.navigation.navigate('Images', { username: contact.username })}
                />
            )
            : <DefaultText>User not found.</DefaultText>
}

export default ContactContainer