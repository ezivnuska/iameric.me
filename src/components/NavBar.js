import React, { useEffect, useMemo, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Button, IconButton, SegmentedButtons, Text } from 'react-native-paper'
import { useApp, useBugs, useFeed, useModal, useTheme, useUser } from '@context'
import { navigate } from '@utils/navigation'

const NavBar = props => {

    const renderNavBar = () => {
        
        switch (props.route.name) {
            case 'Home': return <Text variant='bodyMedium' style={{ paddingHorizontal: 10 }}>This page intentionally left blank.</Text>; break
            case 'Feed': return <FeedNavBar {...props} />; break
            case 'Bugs': return <BugNavBar {...props} />; break
            case 'Images':
            case 'Profile': return <UserNavBar {...props} />; break
            // case 'Work': return <Text style={[styles.heading, styles.padded]}>{`Places I\'ve worked`}</Text>; break
            default: return null
        }
    }

    return (
        <View style={[styles.navBar, styles.shadow]}>
            {/* <View style={styles.centerContainer}> */}
                {renderNavBar()}
            {/* </View> */}
        </View>
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
                    // <View>
                        <Button
                            key={`nav-button-${index}-${label}`}
                            onPress={() => navigate(name, params)}
                            disabled={isActive}
                            labelStyle={styles.navButtonLabel}
                        >
                            {label}
                        </Button>
                    // </View>
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
        <NavButtonList
            route={route}
            labels={[ 'Home', 'Bugs' ]}
        >

            {!landscape && (
                <IconButton
                    icon='file-image-plus'
                    onPress={() => setBugModal('BUG')}
                    size={25}
                />
            )}

        </NavButtonList>
    )
}

const UserNavBar = ({ landscape, route }) => {
    const { authUser } = useApp()
    const { setModal } = useModal()
    const { uploading } = useUser()
    const isCurrentUser = useMemo(() => route.params?.username === authUser?.username, [authUser])
    
    const viewMode = useMemo(() => route.params?.list ? 'list' : 'grid', [route.params])

    const toggleViewMode = () => {
        navigate('Images', {
            username: route.params?.username,
            list: !route.params?.list,
        })
    }

    return (
        <NavButtonList
            route={route}
            labels={[ 'Users', route.params.username, 'Images' ]}
        >
            {route.name === 'Images' && (
                <View style={styles.row}>

                    {isCurrentUser && (
                        <IconButton
                            icon='file-image-plus'
                            onPress={() => setModal('IMAGE_UPLOAD')}
                            size={25}
                            disabled={uploading}
                        />
                    )}

                    {!landscape && (
                        <SegmentedButtons
                            value={viewMode}
                            onValueChange={toggleViewMode}
                            density='small'
                            buttons={[
                                {
                                    value: 'list',
                                    label: 'List',
                                },
                                {
                                    value: 'grid',
                                    label: 'Grid',
                                },
                            ]}
                        >

                        </SegmentedButtons>
                    )}

                </View>
            )}
        </NavButtonList>
    )
}

const FeedNavBar = ({ landscape, route }) => {

    const { setFeedModal } = useFeed()

    return (
        <NavButtonList
            route={route}
            labels={[ 'Home', 'Feed' ]}
        >

            {!landscape && (
                <IconButton
                    icon='message-plus'
                    onPress={() => setFeedModal('FEEDBACK')}
                    size={25}
                />
            )}

        </NavButtonList>
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
        paddingRight: 5,
        // marginBottom: 10,
        // borderWidth: 1,
    },
    navButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        // background: 'yellow',
        // gap: 10,
        // borderWidth: 1,
    },
    navButtonLabel: {
        lineHeight: 30,
        fontSize: 20,
        fontWeight: 700,
        marginVertical: 0,
        marginHorizontal: 10,
        // borderWidth: 1,
    },
    // navLink: {
    //     color: 'red',
    // },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7,
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