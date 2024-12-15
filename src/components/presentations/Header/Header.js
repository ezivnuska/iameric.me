import React, { useMemo }  from 'react'
import { View } from 'react-native'
import {
    Brand,
    BugNavBar,
    FeedNavBar,
    UserNavBar,
} from './components'
import { SimpleButton, IconButton } from '@components'
import { navigate } from '@utils/navigation'
import { useModal } from '@context'

const Header = ({ landscape, user, route }) => {

    const size = 20

    const { setModal } = useModal()

    const renderNav = () => {

        const props = { landscape, route, size }

        switch (route?.name) {
            case 'Feed': return <FeedNavBar {...props} />; break
            case 'Bugs':  return <BugNavBar {...props} />; break
            case 'Profile':
            case 'Images': return <UserNavBar {...props} />; break
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
            }}
        >
            
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: landscape ? 'center' : 'flex-start',
                    marginTop: 10,
                }}
            >
                <Brand user={user} size={30} />

                {/* {navigation} */}
                
                {landscape && user && (
                    <View
                        style={{
                            flexGrow: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                    >
                        <View style={{ flexBasis: 'auto' }}>
                            {renderNav()}
                        </View>
                    </View>
                )}

                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: landscape ? 'center' : 'flex-end',
                        alignItems: 'center',
                        gap: 15,
                    }}
                >
                    <View
                        style={{
                            flexGrow: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >

                        <View
                            style={{
                                flexBasis: 'auto',
                                flexGrow: 1,
                                flexDirection: 'row',
                                justifyContent: user ? 'flex-end' : 'center',
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
                    </View>

                    {!user && (
                        <SimpleButton
                            label='Sign In'
                            onPress={() => setModal('AUTH')}
                        />
                    )}

                </View>

            </View>

            {!landscape && user && (
                <View style={{ marginVertical: 5 }}>
                    {renderNav()}
                </View>
            )}

        </View>
    )
}

export default Header