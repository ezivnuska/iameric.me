import React from 'react'
import { View } from 'react-native'
import { Screen } from './components'
import { Contact, ContactImages } from '@components'
import Contacts, { ContactsModal } from '@contacts'

const ContactsScreen = props => {

    const renderContent = () => {
        switch (props.route.name) {
            case 'Users': return <Contacts {...props} />
            case 'Contact': return <Contact {...props} />
            case 'Images': return <ContactImages {...props} />
            default:
                console.log('Could not render contact screen content')
                return null
        }
    }

    return (
        <Screen secure {...props}>

            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 10,
                }}
            >
                {renderContent()}
            </View>

            <ContactsModal />
        </Screen>
    )
}

export default ContactsScreen