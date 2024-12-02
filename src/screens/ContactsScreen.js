import React from 'react'
import { View } from 'react-native'
import { Screen } from './components'
import Contacts, { ContactsModal } from '@contacts'

const ContactsScreen = props => {

    // const renderContent = () => {
    //     console.log('rendering screen', props.route.name)
    //     switch (props.route.name) {
    //         case 'Contacts': return 
    //         case 'Contact': return <Contact key={`contact-profile-${Date.now()}`} {...props} />
    //         case 'Images': return <ContactImages key={`contact-images-${Date.now()}`} list={props.route.params?.list} {...props} />
    //         default:
    //             console.log('Could not render contact screen content')
    //             return null
    //     }
    // }

    return (
        <Screen secure {...props}>

            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 10,
                }}
            >
                <Contacts {...props} />
            </View>

            <ContactsModal />
        </Screen>
    )
}

export default ContactsScreen