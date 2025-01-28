import React from 'react'
import { Appbar } from 'react-native-paper'
import { useBugs, useFeed } from '@context'

const NavBar = props => {
    console.log('NavBar', props.route.name)
    switch (props.route.name) {
        case 'Home':    
        case 'Work':
        case 'Play':    return <DefaultNavBar {...props} />; break
        case 'Feed':    return <FeedNavBar {...props} />; break
        case 'Users':   return <UsersNavBar {...props} />; break
        case 'Bugs':    return <BugNavBar {...props} />; break
        default:        return null
    }
}

const DefaultNavBar = ({ navigation, route }) => {

    return (
        <Appbar.Header>
            {route.name !== 'Home' && <Appbar.BackAction onPress={() => navigation.navigate('Home')} />}
            <Appbar.Content title={route.name} />
        </Appbar.Header>
    )
}

const BugNavBar = ({ navigation, route }) => {

    const { setBugModal } = useBugs()

    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
            <Appbar.Content title='Bugs' />
            <Appbar.Action icon="bug" onPress={() => setBugModal('BUG')} />
        </Appbar.Header>
    )
}

const UsersNavBar = ({ navigation, route }) => {
    
    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
            <Appbar.Content title='Users' />
        </Appbar.Header>
    )
}

const FeedNavBar = ({ navigation, route }) => {

    const { setFeedModal } = useFeed()

    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
            <Appbar.Content title='Feed' />
            <Appbar.Action icon="message-plus" onPress={() => setFeedModal('FEEDBACK')} />
        </Appbar.Header>
    )
}

export default NavBar