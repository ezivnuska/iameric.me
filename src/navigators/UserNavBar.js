import React, { useMemo } from 'react'
import { View } from 'react-native'
import { Appbar } from 'react-native-paper'
import { useModal, useUser } from '@context'

const UserNavBar = props => {

    const renderNav = () => {
        switch (props.route.name) {
            case 'Profile': return <ProfileNavBar {...props} />; break
            case 'Images':  return <ImagesNavBar {...props} />; break
            default:        return <DefaultNavBar {...props} />
        }
    }
    return (
        <View>
            {renderNav()}
        </View>
    )
    
}

const DefaultNavBar = ({ navigation, route }) => {

    return (
        <Appbar.Header
            mode='small'
            statusBarHeight={0}
        >
            {route.name !== 'Home' && <Appbar.BackAction onPress={() => navigation.navigate('Home')} />}
            <Appbar.Content title={route.name} />
        </Appbar.Header>
    )
}

const ProfileNavBar = ({ navigation, route }) => {
    
    return (
        <Appbar.Header
            mode='small'
            statusBarHeight={0}
            style={{ paddingRight: 10 }}
        >
            <Appbar.BackAction onPress={() => navigation.navigate('Users')} style={{ margin: 0, padding: 0 }} />
            <Appbar.Content title={route.params?.username || 'Profie'} />
            <Appbar.Action
                icon='image-multiple'
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
    const { setModal } = useModal()
    const { uploading, user } = useUser()
    const isCurrentUser = useMemo(() => route.params?.username === user?.username, [user])

    // const viewMode = useMemo(() => route.params?.list ? 'list' : 'grid', [route.params])

    const toggleViewMode = () => navigation.navigate('Images', {
        username: route.params?.username,
        list: !route.params?.list,
    })
    
    return (
        <Appbar.Header
            mode='small'
            statusBarHeight={0}
            // style={{ margin: 0, padding: 0, height: 'auto' }}
        >
            <Appbar.BackAction
                onPress={() => navigation.navigate('Home')}
                // style={{ margin: 0, padding: 0 }}
            />

            <Appbar.Content title='Images' />

            {isCurrentUser && (
                <Appbar.Action
                    icon='file-image-plus'
                    onPress={() => setModal('IMAGE_UPLOAD')}
                    disabled={uploading}
                    style={{ margin: 0, padding: 0 }}
                />
            )}
            {/* {isCurrentUser && ( */}
                <Appbar.Action
                    icon='grid'
                    onPress={toggleViewMode}
                    disabled={!route.params?.list}
                    style={{ margin: 0, padding: 0 }}
                />
            {/* )}
            {isCurrentUser && ( */}
                <Appbar.Action
                    icon='table-column'
                    onPress={toggleViewMode}
                    disabled={route.params?.list}
                    style={{ margin: 0, padding: 0 }}
                />
            {/* )} */}
        </Appbar.Header>
    )
}

export default UserNavBar