import React, { useEffect, useMemo } from 'react'
import { Text, View } from 'react-native'
import { Screen } from '@components'
import { Contact } from '@modules'
import { useContacts } from '@contacts'

export default props => {

    const { getContact } = useContacts()
    
    const user = useMemo(() => getContact(props.route.params?.username), [getContact, props])
    
    useEffect(() => {
        console.log('route', props.route)
        console.log('user', user)
    }, [])

    return (
        <Screen
            {...props}
            title='Contact'
        >
            <View
                style={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    gap: 20,
                }}
            >
                {user ? (
                    <View style={{ flexGrow: 1 }}>
                        <Contact contact={user} />
                    </View>
                ) : null}

            </View>
            
        </Screen>
    )
}