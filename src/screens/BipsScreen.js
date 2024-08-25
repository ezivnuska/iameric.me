import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Screen } from './components'
import {
    Heading,
    IconButton,
    InfoMarker,
    ThemedText,
} from '@components'
import { Map } from '@vis.gl/react-google-maps'
import { BipMap, Bipster } from '@modules'
import { useBips } from '@bips'
import { useModal } from '@modal'
import { useNotification } from '@notification'
import { loadBips } from '@utils/bips'

export default props => {
    const {
        bips,
        bipsLoading,
        setBips,
        setBipsLoading,
    } = useBips()
    const { setModal } = useModal()
    const { addNotification } = useNotification()
    const [ location, setLocation ] = useState(null)
    const [ showMap, setShowMap ] = useState(true)

    const init = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords
                setLocation({ latitude, longitude })
                addNotification('Location set.')
            })
        } else {
            console.log('Geolocation is not supported by this browser.')
        }
    }

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
        init()
    }, [])

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
                            justifyContent: 'space-between',
                            gap: 10,
                        }}
                    >
                        <IconButton
                            name='camera-sharp'
                            onPress={() => setModal('CAPTURE')}
                            size={30}
                            color='tomato'
                        />

                        <IconButton
                            name={`${showMap ? 'list' : 'map'}-sharp`}
                            onPress={() => setShowMap(!showMap)}
                            size={30}
                            color='tomato'
                        />
                    </View>
                </Heading>

                {showMap
                    ? <BipMap />
                    : bipsLoading
                        ? <ThemedText>Loading Bips...</ThemedText>
                        : bips.length > 0
                            ? <Bipster bips={bips} />
                            : <ThemedText bold>No bips to report.</ThemedText>
                }
    
            </View>
    
        </Screen>
    )
}