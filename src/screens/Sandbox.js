import React from 'react'
import { Button } from 'react-native-paper'
import { Screen } from './components'
import { Touch } from '@components'
import sendMail from '@utils/sendMail'

const Sandbox = props => {
    
    return (
        <Screen full secure {...props}>
            <Touch />
            <Button onPress={sendMail}>Send Mail</Button>
        </Screen>
    )
}

export default Sandbox