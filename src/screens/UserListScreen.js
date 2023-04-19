import React from 'react'
import { SecureScreen } from '.'
import { UserDisplay } from '../components'

const UserListScreen = props => (
    <SecureScreen { ...props }>
        <UserDisplay />
    </SecureScreen>
)

export default UserListScreen