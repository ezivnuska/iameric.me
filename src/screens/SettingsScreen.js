import React, { useContext } from 'react'
import {
    AvatarDisplay,
    CenteredContent,
    CloseButton,
    LocationDisplay,
    ModalContent,
    Screen,
    View,
} from '../components'
import { AppContext } from '../AppContext'
import { cleanStorage } from '../Data'
import axios from 'axios'
import { Button } from 'antd'

const SettingsScreen = () => {

    const {
        dispatch,
        user,
    } = useContext(AppContext)

    const signout = async () => {

        dispatch({ type: 'SET_LOADING', loading: 'Signing Out.' })
        
        await cleanStorage()
        
        const { data } = await axios.
            post('/api/signout', { _id: user._id })
        
        if (!data) return console.log('could not sign out user')
        
        dispatch({ type: 'SIGNOUT' })
    }

    return (
        <Screen>

            <CenteredContent>
                
                {(user.role !== 'driver') && <LocationDisplay details={user.location} />}

                <AvatarDisplay />

                <Button
                    onClick={signout}
                    style={{ marginTop: 10 }}
                >
                    Sign Out
                </Button>

                {/*<DeleteAccountButton />*/}

            </CenteredContent>

        </Screen>
    )
}

export default SettingsScreen