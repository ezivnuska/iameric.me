import React from 'react'
import { View } from 'react-native'
import { ContactsList, Screen } from '@components'

const ContactsScreen = props => {
    return (
        <Screen secure {...props}>
    
            <View style={{ flex: 1 }}>
                <ContactsList {...props} />
            </View>
        </Screen>
    )
}

export default ContactsScreen