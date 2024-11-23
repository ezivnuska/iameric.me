import React from 'react'
import { Screen } from './components'
import User, { UserModal } from '@user'
import Images from '@images'

const UserScreen = props => {

    const renderContent = route => {
        switch (route.name)  {
            case 'Profile':
                return <User {...props} />
                break
            case 'Images':
                return <Images {...props} />
                break
            default:
        }
    }
    
    return (
        <Screen {...props} secure>

            {renderContent(props.route)}

            <UserModal />

        </Screen>
    )
}

export default UserScreen