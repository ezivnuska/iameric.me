import React, { useEffect } from 'react'
import { Pressable, Text, View } from 'react-native'
import { IconButton } from '@components'
import { useBugs, useFeed, useTheme } from '@context'
import { navigate } from '@utils/navigation'

const NavBar = props => {

    const { landscape, styles } = useTheme()

    const renderNavBar = () => {
        console.log('props',  props)
        switch (props.route.name) {
            case 'Feed': return <FeedNavBar {...props} />; break
            case 'Bugs': return <BugNavBar {...props} />; break
            case 'Images':
            case 'Profile': return <UserNavBar {...props} />; break
            default: return null
        }
    }

    return (
        <View
            style={[
                styles.flexRow,
                styles.justifyCenter,
                styles.paddedVertical,
            ]}
        >
            <View
                style={{
                    width: '100%',
                    maxWidth: landscape ? '90%' : 400,
                    marginHorizontal: 'auto',
                    // background: 'purple',
                }}
            >
                {renderNavBar()}
            </View>
        </View>
    )
}

const NavButtonList = ({ route, labels, children }) => {

    const { landscape, styles, theme } = useTheme()

    return (
        <View
            style={[
                styles.flexRow,
                styles.justifyBetween,
            ]}
        >

            <View
                style={[
                    styles.flexRow,
                    styles.center,
                    // styles.border,
                ]}
            >

                {labels.map((label, index) => {
                    const name = label === route.params?.username ? 'Profile' : label
                    const params = label === 'Users' ? null : route.params
                    return (
                        <NavButton
                            key={`nav-button-${index}-${label}`}
                            route={label}
                            onPress={() => navigate(name, params)}
                            disabled={label === route.name || (label === route.params?.username && route.name === 'Profile')}
                            style={index > 0 && {
                                borderLeftWidth: 1,
                                borderLeftColor: theme.colors.border,
                            }}
                        />
                    )
                })}
                
            </View>
            
            <View style={styles.paddedHorizontal}>
                {children}
            </View>

        </View>
    )
}

const BugNavBar = ({ landscape, route }) => {

    const { setBugModal } = useBugs()

    return (
        <NavButtonList
            route={route}
            labels={[ 'Home', 'Bugs' ]}
        >

            {!landscape && (
                <IconButton
                    name='create-outline'
                    onPress={() => setBugModal('BUG')}
                    size={28}
                    color='tomato'
                    transparent
                />
            )}

        </NavButtonList>
    )
}

const UserNavBar = ({ landscape, route }) => {

    return (
        <NavButtonList
            route={route}
            labels={[ 'Users', route.params.username, 'Images' ]}
        />
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
                    name='create-outline'
                    onPress={() => setFeedModal('FEEDBACK')}
                    size={28}
                    color='tomato'
                    transparent
                />
            )}

        </NavButtonList>
    )
}

const NavButton = ({
    route,
    onPress,
    disabled = false,
    ...props
}) => {
    const { styles } = useTheme()
    return (
        <Pressable
            {...props}
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.paddedHorizontal,
                props.style,
            ]}
        >
            <Text
                style={[
                    styles.navLink,
                    disabled && styles.navLinkDisabled,
                ]}
            >
                {route}
            </Text>

        </Pressable>
    )
}

export default NavBar