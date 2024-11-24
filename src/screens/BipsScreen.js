import React, { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import { Screen } from './components'
import { ThemedText } from '@components'
import { Bipster } from '@modules'
import { BipContextProvider, useBips } from '@modules/Bipster'
import { useModal } from '@modal'
import { useNotification } from '@notification'
import { useSocket } from '@socket'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCarBurst } from '@fortawesome/free-solid-svg-icons/faCarBurst'

const BipsScreen = props => {
    
    const {
        addBip,
        bips,
        newBip,
        setNewBip,
        removeBip,
    } = useBips()
    const { addNotification } = useNotification()
    const { socket } = useSocket()

    const { setNewModal } = useModal()
    const [ currentBipIndex, setCurrentBipIndex ] = useState(null)

    const handleNewBip = bip => {
        addBip(bip)
        addNotification('active bip reported')
    }

    useEffect(() => {
        socket.on('new_bip', handleNewBip)
        socket.on('deleted_bip', removeBip)
    }, [])

    useEffect(() => {
        if (bips && !currentBipIndex) setCurrentBipIndex(0)
    }, [bips])

    useEffect(() => {
        if (newBip) {
            setCurrentBipIndex(0)
            setNewBip(false)
        }
    }, [newBip])

    return (
        <Screen
            {...props}
            secure
        >
            <View style={{ flex: 1 }}>
                
                <Pressable
                    onPress={() => setNewModal('CAPTURE')}
                    style={{
                        // flex: 1,
                        flexBasis: 'auto',
                        flexGrow: 0,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 10,
                        paddingHorizontal: 15,
                        height: 28,
                        borderRadius: 8,
                        overflow: 'hidden',
                        backgroundColor: 'tomato',
                    }}
                >
                    <FontAwesomeIcon
                        icon={faCarBurst}
                        size={24}
                        color='#fff'
                        style={{
                            transform: [{
                                rotate: '-15deg',
                            }],
                        }}
                    />
                    <ThemedText color='#fff' bold>Capture Bip</ThemedText>
                </Pressable>
                
                <BipContextProvider>
                    <Bipster />
                </BipContextProvider>
            </View>
    
        </Screen>
    )
}

export default BipsScreen