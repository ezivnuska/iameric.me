import React from 'react'
import { View } from 'react-native'
import {
    Form,
    Screen,
    SimpleButton,
    Socket,
    ThemedText,
} from '@components'
import { useApp } from '@app'
import { useSocket } from '../SocketContext'

export default props => {
    // console.log('check out available props from navigation container...', props)
    // we are using the navigate method below.

    const { user } = useApp()
    const { socket } = useSocket()

    const getDisplayName = () => {
        if (user) return user.username
        else return `guest`
    }
    
    return (
        <Screen
            {...props}
            secure={false}
            // title='Home'
        >
            <View
                style={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    gap: 20,
                }}
            >

                <View style={{ flexGrow: 1 }}>
                    <ThemedText
                        style={{
                            marginBottom: 10,
                        }}
                    >
                        {`Connected as ${getDisplayName()} ...${String(socket.id).substring(socket.id.length - 3)}`}
                    </ThemedText>
                    <Socket />
                    {!user && <Form type='SIGN_IN' />}
                </View>

                <View style={{ flexGrow: 0 }}>
                    <SimpleButton
                        label='Contacts'
                        onPress={() => props.navigation.navigate('Contacts')}
                        disabled={!user}
                    />
                </View>
            </View>
            

        </Screen>
    )
}