import React from 'react'
import { Screen } from './components'
import User from '@user'

const ProfileScreen = props => (
    <Screen {...props} secure>
        <User {...props} />
    </Screen>
)

export default ProfileScreen