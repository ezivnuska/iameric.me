import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { useModal, useSocket, useTheme, useUser } from '@context'
import navigationRef from '@utils/navigation'

const Footer = ({ landscape, route }) => {

    const { dark, toggleTheme } = useTheme()
    const { user } = useUser()
    const { setModal } = useModal()
    const { connections, connectionsLoading } = useSocket()

    return (
            
        <View style={styles.footerLeft}>

            <View style={{ paddingHorizontal: 10 }}>

                {connectionsLoading ? (
                    <Text variant='titleLarge'>
                        Connectiong to socket...
                    </Text>
                ) : (
                    <Pressable onPress={() => setModal('SOCKETS')}>
                        <Text variant='titleLarge'>
                            {`${connections.length} user${connections.length !== 1 ? `s` : ''} connected`}
                        </Text>
                    </Pressable>
                )}
            </View>

            {user && (
                <View style={styles.footerRight}>

                    <IconButton
                        icon={`${dark ? 'white-balance-sunny' : 'weather-night'}`}
                        size={25}
                        onPress={toggleTheme}
                    />

                    <IconButton
                        icon='grid'
                        size={25}
                        onPress={() => navigationRef.navigate('Play')}
                        disabled={route === 'Play'}
                    />

                    <IconButton
                        icon='ladybug'
                        size={25}
                        onPress={() => navigationRef.navigate('Bugs')}
                        disabled={route === 'Bugs'}
                    />

                    <IconButton
                        icon='logout-variant'
                        size={25}
                        onPress={() => setModal('SETTINGS')}
                    />
                </View>
            )}
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerLeft: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    footerRight: {
        flexDirection: 'row',
        alignItems: 'center',
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