import React from 'react'
import { View } from 'react-native'
import { Screen } from '@components'
import { Contacts } from '@modules'
import { ContactsContextProvider } from '@contacts'

export default props => (
    <Screen
        {...props}
        title='Contacts'
    >
        <ContactsContextProvider>

            <View
                style={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    gap: 20,
                }}
            >
                <View style={{ flexGrow: 1 }}>
                    <Contacts />
                </View>

            </View>

        </ContactsContextProvider>
        
    </Screen>
)