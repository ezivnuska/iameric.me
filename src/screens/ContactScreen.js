import React, { useMemo } from 'react'
import { Screen } from '@components'
import { Contact } from '@modules'
import { useContacts } from '@contacts'
import { ActivityIndicator } from 'react-native-paper'

export default props => {

    const { getContact } = useContacts()
    
    const user = useMemo(() => getContact(props.route.params?.username), [getContact, props])

    return (
        <Screen {...props}>
            {user
                ? <Contact contact={user} />
                : <ActivityIndicator size='large' />
            }
        </Screen>
    )
}