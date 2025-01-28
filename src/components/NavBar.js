import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Appbar, Button, IconButton, SegmentedButtons, Text } from 'react-native-paper'
import { useApp, useBugs, useFeed, useModal, useUser } from '@context'
import { navigate } from '@utils/navigation'

const NavBar = props => {

    const renderNavBar = () => {
        
        switch (props.route.name) {
            case 'Home': return <Text variant='titleMedium' style={{ paddingHorizontal: 10 }}>This page intentionally left blank. Not sure why.</Text>; break
            case 'Feed': return <FeedNavBar {...props} />; break
            case 'Bugs': return <BugNavBar {...props} />; break
            case 'Users': return <Text variant='titleMedium' style={{ paddingHorizontal: 10 }}>Users</Text>; break
            case 'Images':
            case 'Profile': return <UserNavBar {...props} />; break
            case 'Work': return <Text variant='titleMedium' style={{ paddingHorizontal: 10 }}>{`Places I\'ve worked`}</Text>; break
            default: return null
        }
    }

    return (
        <View style={styles.navBar}>
            {renderNavBar()}
        </View>
    )
}

const Menu = ({ route, labels, children }) => {

    const title = route.name === 'Profile' ? route.params?.username : route.name
    return (
        <Appbar.Header>
            {route.name !== 'Users' && (
                <Appbar.BackAction
                    onPress={() => {
                        if (route.name === 'Profile') {
                            navigate('Users')
                        } else {
                            navigate('Profile', {
                                username: route.params?.username,
                                list: route.params?.list,
                            })
                        }
                    }}
                />
            )}
            <Appbar.Content title={title} />
            {/* {route.name === 'Images' && <Appbar.Content title='Users' />} */}
            {/* {labels.map((label, index) => {
                
                const name = label === route.params?.username ? 'Profile' : label
                const params = label === 'Users' ? null : route.params
                
                return <Appbar.Action icon="calendar" onPress={() => navigate(name, params)} />
            })} */}
            {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
            {children}
        </Appbar.Header>
    )
}

const NavButtonList = ({ route, labels, children }) => (

    <View style={styles.row}>

        <View style={styles.navButtons}>

            {labels.map((label, index) => {
                
                const name = label === route.params?.username ? 'Profile' : label
                const params = label === 'Users' ? null : route.params
                const isActive = label === route.name || (route.name === 'Profile' && route.params?.username === label)
                
                return (
                    <Button
                        mode={isActive ? 'contained' : 'default'}
                        key={`nav-button-${index}-${label}`}
                        onPress={() => navigate(name, params)}
                        // disabled={isActive}
                        labelStyle={styles.buttonLabel}
                        compact={true}
                    >
                        {label}
                    </Button>
                )
            })}
            
        </View>
        
        <View>
            {children}
        </View>

    </View>
)

const BugNavBar = ({ landscape, route }) => {

    const { setBugModal } = useBugs()

    return (
        <Menu
            route={route}
            labels={[ 'Home', 'Bugs' ]}
        >

            {!landscape && (
                <Appbar.Action icon="bug" onPress={() => setBugModal('BUG')} />
                // <IconButton
                //     icon='file-image-plus'
                //     onPress={() => setBugModal('BUG')}
                //     size={25}
                //     style={{ margin: 0 }}
                // />
            )}

        </Menu>
    )
}

const UserNavBar = ({ landscape, route }) => {
    const { user } = useApp()
    const { setModal } = useModal()
    const { uploading } = useUser()
    const isCurrentUser = useMemo(() => route.params?.username === user?.username, [user])
    
    const viewMode = useMemo(() => route.params?.list ? 'list' : 'grid', [route.params])

    const toggleViewMode = () => {
        navigate('Images', {
            username: route.params?.username,
            list: !route.params?.list,
        })
    }

    return route.name === 'Images' ? (
        <Menu
            route={route}
            // labels={[ 'Users', route.params.username, 'Images' ]}
        >
            <Appbar.Action
                icon="file-image-plus"
                onPress={() => setModal('IMAGE_UPLOAD')}
                disabled={uploading}
            />
            <Appbar.Action
                icon="grid"
                onPress={toggleViewMode}
            />
            <Appbar.Action
                icon="table-column"
                onPress={toggleViewMode}
            />
            {/* { (
                // <View
                //     style={styles.row}
                // >

                    {isCurrentUser && (
                        
                        // <IconButton
                        //     icon='file-image-plus'
                        //     onPress={() => setModal('IMAGE_UPLOAD')}
                        //     size={25}
                        // />
                    )}

                    {!landscape && (
                        <>
                            
                        </>
                        // <SegmentedButtons
                        //     value={viewMode}
                        //     onValueChange={toggleViewMode}
                        //     density='small'
                        //     buttons={[
                        //         {
                        //             value: 'list',
                        //             icon: 'table-column',
                        //             // label: 'List',
                        //         },
                        //         {
                        //             value: 'grid',
                        //             icon: 'grid',
                        //             // label: 'Grid',
                        //         },
                        //     ]}
                        // >

                        // </SegmentedButtons>
                    )}

                </View>
            )} */}
        </Menu>
    ) : (
        <Menu
            route={route}
            // labels={[ 'Users', route.params.username, 'Images' ]}
        >
            <Appbar.Action
                icon="image-multiple"
                onPress={() => navigate('Images', {
                    username: route.params?.username,
                    list: !route.params?.list,
                })}
            />
        </Menu>
    )
}

const FeedNavBar = ({ landscape, route }) => {

    const { setFeedModal } = useFeed()

    return (
        <Menu
        // <NavButtonList
            route={route}
            // labels={[ 'Home', 'Feed' ]}
        >

            {!landscape && (
                <Appbar.Action
                    icon="message-plus"
                    onPress={() => setFeedModal('FEEDBACK')}
                />
                // <IconButton
                //     icon='message-plus'
                //     onPress={() => setFeedModal('FEEDBACK')}
                //     size={25}
                // />
            )}

        </Menu>
    )
}

export default NavBar

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        paddingRight: 2,
        // marginBottom: 10,
        // borderWidth: 1,
    },
    navButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        // background: 'yellow',
        gap: 2,
        // borderWidth: 1,
    },
    buttonLabel: {
        lineHeight: 24,
        fontSize: 18,
        fontWeight: 700,
        marginVertical: 5,
        marginHorizontal: 10,
        // borderWidth: 1,
    },
    // navLink: {
    //     color: 'red',
    // },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        // paddingVertical: 7,
        // borderWidth: 1,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 3,
    },
})