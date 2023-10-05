import React, { useContext } from 'react'
import {
    AvatarDisplay,
    CenteredContent,
    CloseButton,
    LocationDisplay,
    Screen,
} from '../components'
import { AppContext } from '../AppContext'
import { cleanStorage } from '../Auth'
import axios from 'axios'
import { Button } from 'antd'

const SettingsScreen = () => {

    const {
        dispatch,
        user,
    } = useContext(AppContext)

    const signout = async () => {
        
        await cleanStorage()
        
        console.log('attempting sign out')
        
        const { data } = await axios.
            post('/api/signout', { _id: user._id })
        
        if (!data) return console.log('could not sign out user')
            
        console.log(`dispatching SIGNOUT for ${data.user.username}`)
        
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