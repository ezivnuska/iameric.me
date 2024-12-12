import React from 'react'
import { View } from 'react-native'
import {
    BugNavBar,
    FeedNavBar,
    UserNavBar,
} from './components'

const Navigation = ({ route, size, ...props }) => {
    
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
            content = <UserNavBar route={route} size={size} />
            break
            
        default: return null
    }

    return (
        <View {...props}>
            {content}
        </View>
    )
}

export default Navigation