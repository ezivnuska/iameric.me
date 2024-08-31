import React, { useEffect, useState } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { Screen } from './components'
import {
    Heading,
    ThemedText,
} from '@components'
import { BipMap, Bipster } from '@modules'
import { useBips } from '@bips'
import { useModal } from '@modal'
import { loadBips } from '@utils/bips'
import Icon from 'react-native-vector-icons/Ionicons'

export default props => {
    const {
        bips,
        bipsLoading,
        setBips,
        setBipsLoading,
    } = useBips()

    const { setNewModal } = useModal()
    // const [ location, setLocation ] = useState(null)
    const [ currentBipIndex, setCurrentBipIndex ] = useState(null)

    // const init = async () => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(position => {
    //             const { latitude, longitude } = position.coords
    //             setLocation({ latitude, longitude })
    //         })
    //     } else {
    //         console.log('Geolocation is not supported by this browser.')
    //     }
    // }

    useEffect(() => {
        const fetchBips = async () => {
            setBipsLoading(true)
            const bips = await loadBips()
            setBipsLoading(false)
            if (bips) setBips(bips)
        }
        if (!bips || !bips.length) {
            fetchBips()
        }
        // init()
        if (currentBipIndex) {
            // setCurrentBipIndex(null)
        } else {
            // setNewModal('QUICK')
        }
    }, [])

    const onBipSelected = index => {
        setCurrentBipIndex(index)
    }

    return (
        <Screen
            {...props}
            secure={true}
        >
    
            <View style={{ flex: 1 }}>
    
                <Heading
                    title={`Bipster - ${bips.length} bip${bips.length !== 0 ? 's' : ''}`}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}
                    >
                        <Pressable
                            onPress={() => setNewModal('CAPTURE')}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                gap: 10,
                            }}
                        >
                            <ThemedText color='tomato' bold>Capture Bip</ThemedText>
                            <Icon
                                name='camera-sharp'
                                size={30}
                                color='tomato'
                            />
                        </Pressable>
                    </View>
                </Heading>
                
                <View    
                    style={{
                        flex: 1,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <BipMap
                            currentIndex={currentBipIndex}
                            onBipSelected={onBipSelected}
                        />
                    </View>
                    <View
                        style={{
                            flexBasis: 'auto',
                            // borderWidth: 1,
                        }}
                    >
                        <Pressable
                            style={{
                                flex: 1,
                                height: 40,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                backgroundColor: '#eee',
                                borderRadius: 8,
                                overflow: 'hidden',
                                marginVertical: 5,
                            }}
                        >
                            <Icon
                                name='menu-sharp'
                                size={18}
                                color='#ccc'
                            />
                        </Pressable>
                    </View>
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        {bipsLoading
                            ? <ThemedText>Loading Bips...</ThemedText>
                            : bips.length > 0
                                ? (
                                    <Bipster
                                        bips={bips}
                                        currentIndex={currentBipIndex}
                                        // onSelected={index => setCurrentBipIndex(index)}
                                    />
                                )
                                : <ThemedText bold>No bips to report.</ThemedText>
                        }
                    </View>
                </View>
    
            </View>
    
        </Screen>
    )
}