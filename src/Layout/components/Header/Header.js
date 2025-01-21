import React  from 'react'
import { View } from 'react-native'
import { Brand } from './components'
import { IconButton, SimpleButton } from '@components'
import { navigate } from '@utils/navigation'
import { useModal, useTheme } from '@context'

const Header = ({ landscape, route, user = null }) => {
    
    const { styles } = useTheme()
    const { setModal } = useModal()
    
    return (
        <View
            style={{
                flex: 1,
                width: '100%',
                // marginBottom: 10,
                minWidth: 300,
                maxWidth: landscape ? '90%' : 400,
                marginHorizontal: 'auto',
            }}
        >
            
            <View
                style={[
                    styles.flexRow,
                    styles.justifyBetween,
                    styles.padded,
                    // {
                    //     flex: 1,
                    //     flexDirection: 'row',
                    //     justifyContent: 'space-between',
                    //     alignItems: landscape ? 'center' : 'flex-start',
                    //     paddingHorizontal: 10,
                    //     marginTop: 10,
                    // }
                ]}
            >
                <Brand
                    user={user}
                    disabled={route?.name === 'Home'}
                />

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
                                gap: 10,
                                height: 40,
                            }}
                        >

                            <IconButton
                                name={`people-${route?.name === 'Users' ? 'sharp' : 'outline'}`}
                                size={24}
                                onPress={() => navigate('Users')}
                                disabled={route?.name === 'Users'}
                                padding={5}
                            />

                            <IconButton
                                name={`reader-${route?.name === 'Work' ? 'sharp' : 'outline'}`}
                                size={24}
                                onPress={() => navigate('Work')}
                                disabled={route?.name === 'Work'}
                                padding={5}
                            />

                            <IconButton
                                name={`list-${route?.name === 'Feed' ? 'sharp' : 'outline'}`}
                                size={24}
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

            {/* {!landscape && user && (
                <View style={{ marginVertical: 10 }}>
                    {renderNav()}
                </View>
            )} */}

        </View>
    )
}

export default Header