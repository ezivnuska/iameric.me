import React from 'react'
import { Appbar } from 'react-native-paper'
import { useBugs, useFeed, useModal } from '@context'

const NavBar = props => {
    console.log('NavBar', props.route.name)
    switch (props.route.name) {
        case 'Feed':    return <FeedNavBar {...props} />; break
        case 'Users':   return <UsersNavBar {...props} />; break
        case 'Bugs':    return <BugNavBar {...props} />; break
        case 'Profile': return <ProfileNavBar {...props} />; break
        case 'Images':  return <ImagesNavBar {...props} />; break
        case 'Home':    
        case 'Work':
        case 'Play':
        default:        return <DefaultNavBar {...props} />
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

const ProfileNavBar = ({ navigation, route }) => {
    
    return (
        <Appbar.Header style={{ height: 'auto', paddingRight: 10 }}>
            <Appbar.BackAction onPress={() => navigation.navigate('Users')} style={{ margin: 0, padding: 0 }} />
            <Appbar.Content title={route.params?.username || 'Profie'} />
            <Appbar.Action
                icon="image-multiple"
                onPress={() => navigation.navigate('Images', {
                    username: route.params?.username,
                    // list: false,
                })}
                style={{ margin: 0, padding: 0 }}
            />
        </Appbar.Header>
    )
}

const ImagesNavBar = ({ navigation, route }) => {
    const { addModal } = useModal()
    const { uploading, user } = useUser()
    const isCurrentUser = useMemo(() => route.params?.username === user?.username, [user])

    // const viewMode = useMemo(() => route.params?.list ? 'list' : 'grid', [route.params])

    const toggleViewMode = () => navigation.navigate('Images', {
        username: route.params?.username,
        list: !route.params?.list,
    })
    
    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
            <Appbar.Content title={`${route.params?.username || 'User'} : Images`} />
            {isCurrentUser && (
                <Appbar.Action
                    icon="file-image-plus"
                    onPress={() => addModal('IMAGE_UPLOAD')}
                    disabled={uploading}
                />
            )}
            {isCurrentUser && (
                <Appbar.Action
                    icon="grid"
                    onPress={toggleViewMode}
                />
            )}
            {isCurrentUser && (
                <Appbar.Action
                    icon="table-column"
                    onPress={toggleViewMode}
                />
            )}
        </Appbar.Header>
    )
}

const BugNavBar = ({ navigation, route }) => {

    const { addModal } = useModal()

    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
            <Appbar.Content title='Bugs' />
            <Appbar.Action icon='bug' onPress={() => addModal('BUG')} />
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

    const { addModal } = useModal()

    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
            <Appbar.Content title='Feed' />
            <Appbar.Action icon="message-plus" onPress={() => addModal('FEEDBACK')} />
        </Appbar.Header>
    )
}

export default NavBar
// import React, { useMemo } from 'react'
// import { Appbar } from 'react-native-paper'
// import { useApp, useBugs, useFeed, useModal, useUser } from '@context'
// // import { navigate } from '@utils/navigation'

// const NavBar = props => {

//     switch (props.route.name) {
//         case 'Feed':    return <FeedNavBar {...props} />; break
//         case 'Users':   return <UsersNavBar {...props} />; break
//         // case 'Profile': return <ProfileNavBar {...props} />; break
//         // case 'Images':  return <ImagesNavBar {...props} />; break
//         case 'Bugs':    return <BugNavBar {...props} />; break
//         default:        return <DefaultNavBar {...props} />
//     }
// }

// const DefaultNavBar = ({ navigation, route }) => {

//     return (
//         <Appbar.Header>
//             {route.name !== 'Home' && <Appbar.BackAction onPress={() => navigation.navigate('Home')} />}
//             <Appbar.Content title={route.name} />
//         </Appbar.Header>
//     )
// }

// const BugNavBar = ({ navigation, route }) => {

//     const { addModal } = useModal()

//     return (
//         <Appbar.Header>
//             <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
//             <Appbar.Content title='Bugs' />
//             <Appbar.Action icon='bug' onPress={() => addModal('BUG')} />
//         </Appbar.Header>
//     )
// }

// const UsersNavBar = ({ navigation, route }) => {
    
//     return (
//         <Appbar.Header>
//             <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
//             <Appbar.Content title='Users' />
//         </Appbar.Header>
//     )
// }

// const ProfileNavBar = ({ navigation, route }) => {
    
//     return (
//         <Appbar.Header>
//             <Appbar.BackAction onPress={() => navigation.navigate('Users')} />
//             <Appbar.Content title={route.params?.username || 'Profie'} />
//             <Appbar.Action
//                 icon="image-multiple"
//                 onPress={() => navigation.navigate('Images', {
//                     username: route.params?.username,
//                     // list: false,
//                 })}
//             />
//         </Appbar.Header>
//     )
// }

// const ImagesNavBar = ({ navigation, route }) => {
//     const { addModal } = useModal()
//     const { uploading, user } = useUser()
//     const isCurrentUser = useMemo(() => route.params?.username === user?.username, [user])

//     // const viewMode = useMemo(() => route.params?.list ? 'list' : 'grid', [route.params])

//     const toggleViewMode = () => navigation.navigate('Images', {
//         username: route.params?.username,
//         list: !route.params?.list,
//     })
    
//     return (
//         <Appbar.Header>
//             <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
//             <Appbar.Content title='Images' />
//             {isCurrentUser && (
//                 <Appbar.Action
//                     icon="file-image-plus"
//                     onPress={() => addModal('IMAGE_UPLOAD')}
//                     disabled={uploading}
//                 />
//             )}
//             <Appbar.Action
//                 icon="grid"
//                 onPress={toggleViewMode}
//             />
//             <Appbar.Action
//                 icon="table-column"
//                 onPress={toggleViewMode}
//             />
//         </Appbar.Header>
//     )
// }

// const FeedNavBar = ({ navigation, route }) => {

//     const { addModal } = useModal()

//     return (
//         <Appbar.Header>
//             <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
//             <Appbar.Content title='Feed' />
//             <Appbar.Action icon="message-plus" onPress={() => addModal('FEEDBACK')} />
//         </Appbar.Header>
//     )
// }

// export default NavBar