import React from 'react'
import { Screen } from '.'
import { UserDisplay } from '../components'

const UserListScreen = props => (
    <Screen { ...props }>
        <UserDisplay />
    </Screen>
)

export default UserListScreen