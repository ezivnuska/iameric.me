import React from 'react'
import { View } from 'react-native'
import { Screen } from './components'
import { ScreenHeader } from '@components'
import Contacts from '@contacts'

const ContactsScreen = props => (
    <Screen
        {...props}
        secure
    >

        <ScreenHeader label='Contacts' />

        <View
            style={{
                flex: 1,
                paddingHorizontal: 10,
            }}
        >
            <Contacts {...props} />
        </View>
    </Screen>
)

export default ContactsScreen