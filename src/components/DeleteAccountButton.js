import React from 'react'
import {
    View,
} from 'react-native'
import {
    ThemedText,
    IconButton,
} from '.'
import {
    useForm,
    useUser,
} from '@context'
import classes from '../styles/classes'

export default () => {

    const { formLoading } = useForm()
    const { setUserModal } = useUser()

    return (
        <View
            style={{
                marginTop: 20,
            }}
        >
            <ThemedText
                style={[
                    classes.headerSecondary,
                    { marginBottom: 5 },
                ]}
            >
                Delete Account
            </ThemedText>
            
            <ThemedText
                style={{ marginBottom: 15 }}
            >
                We hate to see you go. Deleting your account 
                will permantly remove all images and data.
            </ThemedText>

            <IconButton
                type='danger'
                label='Delete Account'
                onPress={() => setUserModal('DESTROY')}
                disabled={formLoading}
            />

        </View>
    )
}