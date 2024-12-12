import React, { useMemo }  from 'react'
import { View } from 'react-native'
import {
    Brand,
    BugNavBar,
    FeedNavBar,
    UserNavBar,
} from './components'
import { IconButton } from '@components'
import { navigate } from '@utils/navigation'

const Header = ({ landscape, user, route }) => {

    const size = 20

    const renderNav = () => {

        const props = {
            landscape,
            route,
            size,
        }

        switch (route?.name) {
            case 'Feed':
                return <FeedNavBar {...props} />
                break

            case 'Bugs': 
                return <BugNavBar {...props} />
                break

            case 'Profile':
            case 'Images':
                return <UserNavBar {...props} />
                break
                
            default: return null
        }

    }
    
    return (
        <View
            style={{
                flex: 1,
                width: '100%',
                marginBottom: 10,
                minWidth: 300,
                maxWidth: landscape ? '90%' : 400,
                marginHorizontal: 'auto',
                paddingHorizontal: 10,
                // background: '#000',
            }}
        >
            
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    // flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    // justifyContent: landscape ? 'space-between' : 'flex-start',
                    alignItems: landscape ? 'center' : 'flex-start',
                    // gap: landscape ? 0 : 15,
                    marginTop: 10,
                    // height: 'auto',
                    // background: 'red',
                }}
            >
                <Brand user={user} size={30} />
                {/* <MainHeader
                    landscape={landscape}
                    route={route}
                    size={size}
                    user={user}
                /> */}

                {/* {navigation} */}

                {landscape && renderNav()}

                <View
                    style={{
                        // flex: 1,
                        flexBasis: 'auto',
                        // flexGrow: 1,
                        flexDirection: 'row',
                        justifyContent: landscape ? 'center' : 'flex-end',
                        alignItems: 'center',
                        gap: 15,
                        // background: 'green',
                    }}
                >
                    {/* {route && ( */}
                        <View
                            style={{
                                // flex: 1,
                                flexBasis: 'auto',
                                // flexGrow: 1,
                                flexDirection: 'row',
                                justifyContent: landscape ? 'space-evenly' : 'center',
                                alignItems: 'center',
                                gap: 15,
                                height: 40,
                            }}
                        >

                            <IconButton
                                name='people-outline'
                                onPress={() => navigate('Users')}
                                disabled={route?.name === 'Users'}
                                padding={5}
                            />

                            <IconButton
                                name='build-outline'
                                onPress={() => navigate('Work')}
                                disabled={route?.name === 'Work'}
                                padding={5}
                            />

                            <IconButton
                                name='list-outline'
                                onPress={() => navigate('Feed')}
                                disabled={route?.name === 'Feed'}
                                padding={5}
                            />

                        </View>
                    {/* )} */}
                </View>

            </View>

            {!landscape && (
                <View style={{ marginVertical: 5 }}>
                    {renderNav()}
                </View>
            )}

        </View>
    )
}

export default Header