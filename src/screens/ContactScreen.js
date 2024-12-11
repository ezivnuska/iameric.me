import React from 'react'
import { Contact, ContactImages, Screen } from '@components'

const ContactScreen = props => {

    const renderContent = () => {
        
        switch (props.route.name) {
            case 'Profile':
                return (
                    <Contact
                        {...props}
                        key={`profile-${Date.now()}`}
                    />
                )
                break
            case 'Images':
                    return (
                    <ContactImages
                        {...props}
                        key={`contact-images-${Date.now()}`}
                        list={props.route.params?.list}
                    />
                )
                break
            default:
                console.log('Could not render contact details')
                return null
        }
    }

    return (
        <Screen
            secure
            full={props.route.name === 'Images' && props.route.params?.list}
            {...props}
        >
            {renderContent()}
        </Screen>
    )
}

export default ContactScreen