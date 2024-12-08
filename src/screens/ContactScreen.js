import React from 'react'
import { View } from 'react-native'
import { Contact, ContactImages, Screen } from '@components'
// import { useContacts } from '@context'

const ContactScreen = props => {
    
    // const { setContact } = useContacts()

    // useEffect(() => {
    //     return () => {
    //         console.log('resetting contact')
    //         setContact(null)
    //     }
    // })

    const renderContent = () => {
        
        switch (props.route.name) {
            case 'Contact': return <Contact key={`profile-${Date.now()}`} {...props} />
            case 'Images': return (
                <ContactImages
                    key={`contact-images-${Date.now()}`}
                    list={props.route.params?.list}
                    {...props}
                />
            )
            default:
                console.log('Could not render contact details')
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

            {/* <ContactsModal /> */}
        </Screen>
    )
}

export default ContactScreen