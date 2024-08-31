import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { BipMarker } from './components'
import { Map } from '@vis.gl/react-google-maps'
import { useBips } from '@bips'
import { useNotification } from '@notification'
import { loadBips } from '@utils/bips'

export default () => {

    const {
        bips,
        bipsLoading,
        setBips,
        setBipsLoading,
    } = useBips()

    const { addNotification } = useNotification()
    
    const [ location, setLocation ] = useState(null)

    const [ visibleMarkerIndex, setVisibleMarkerIndex ] = useState(null)

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

        if (!bips || !bips.length) {
            setBipsLoading(true)
            const bips = await loadBips()
            setBipsLoading(false)
            if (bips) setBips(bips)
        }
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <View style={{ flex: 1 }}>

            {location && (
                <Map
                    id='bipmap'
                    mapId='bipmap'
                    defaultCenter={{
                        lat: Number(location.latitude),
                        lng: Number(location.longitude),
                    }}
                    defaultZoom={12}
                    gestureHandling={'greedy'}
                    disableDefaultUI={false}
                    reuseMaps={true}
                    onClick={() => setVisibleMarkerIndex(null)}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {bips && bips.length && (
                        <View style={{ borderWidth: 1 }}>
                            {bips.map((bip, key) => (
                                <BipMarker
                                    key={`bip-${key}`}
                                    bip={bip}
                                    open={visibleMarkerIndex === key}
                                    onClear={() => setVisibleMarkerIndex(null)}
                                    onClick={() => setVisibleMarkerIndex(key)}
                                />
                            ))}
                        </View>
                    )}
                </Map>
            )}

        </View>
    )
}