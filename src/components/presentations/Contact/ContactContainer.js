import React, { useEffect } from 'react'
import ContactView from './ContactView'
import { ActivityIndicator, TextCopy } from '@components'
import { useModal, useUser } from '@context'

const ContactContainer = props => {

    const {
        userDetails,
        userDetailsLoading,
        initUserDetails,
    } = useUser()
    
    const { setModal } = useModal()

    useEffect(() => {
        if (!userDetails || userDetails.username !== props.route.params?.username) {
            initUserDetails(props.route.params.username)
        }
    }, [userDetails])

    return userDetailsLoading
        ? <ActivityIndicator size='medium' label='Loading User...' />
        : userDetails
            ? (
                <ContactView
                    {...props}
                    contact={userDetails}
                    showImage={() => setModal('SHOWCASE', userDetails.profileImage)}
                    showContact={() => props.navigation.navigate('Images', { username: userDetails.username })}
                />
            )
            : <TextCopy style={{ paddingHorizontal: 10 }}>Looking for user details...</TextCopy>
}

export default ContactContainer