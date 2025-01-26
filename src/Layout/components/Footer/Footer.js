import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { useModal, useSocket, useTheme, useUser } from '@context'
import navigationRef from '@utils/navigation'

const Footer = ({ landscape, route }) => {

    const { dark, theme, toggleTheme } = useTheme()
    const { user } = useUser()
    const { setModal } = useModal()
    const { connections, connectionsLoading } = useSocket()

    return (
            
        <View style={styles.container}>

            <View style={styles.footerLeft}>

                {connectionsLoading ? (
                    <Text variant='titleMedium'>
                        Connectiong to socket...
                    </Text>
                ) : (
                    <Pressable onPress={() => setModal('SOCKETS')}>
                        <Text variant='titleMedium'>
                            {`${connections.length} connection${connections.length !== 1 ? `s` : ''}`}
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
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