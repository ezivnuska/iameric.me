import React from 'react'
import {
    BugNavBar,
    FeedNavBar,
    UserNavBar,
} from './components'

const Navigation = ({ route }) => {
    
    let content = null
    
    switch (route.name) {
        case 'Feed':
            content = <FeedNavBar route={route} />
            break

        case 'Bugs': 
            content = <BugNavBar route={route} />
            break

        case 'Profile':
        case 'Images':
            content = <UserNavBar route={route} />
            break
            
        default: return null
    }

    return content
}

export default Navigation