import React, { useEffect, useMemo, useState } from 'react'
import { Pressable, View } from 'react-native'
import {
    AdvancedMarker,
    InfoWindow,
    useAdvancedMarkerRef
} from '@vis.gl/react-google-maps'
import {
    ThemedText,
    ThumbList,
    Time,
} from '@components'
import { useModal } from '@modal'
import { getAddress } from '@utils/map'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({ bip, onClick, disabled = false, open = false, ...props }) => {

    const { _id, location, user } = bip

    const { setModal } = useModal()

    // const [ infowindowOpen, setInfowindowOpen ] = useState(false)
    const [ addressData, setAddressData ] = useState(null)
    const [ addressLoading, setAddressLoading ] = useState(false)

    const address = useMemo(() => {
        if (!addressData) return null
        const { streetNumber, streetName, cityName } = addressData
        return `${cityName}\n${streetNumber} ${streetName}`
    })

    const [ markerRef, marker ] = useAdvancedMarkerRef()

    useEffect(() => {
        if (open) {
            if (!address) getAddressFromCoords({ lat: Number(location.latitude), lng: Number(location.longitude) })
        }
    }, [open])

    const getAddressFromCoords = async coords => {
        setAddressLoading(true)
        const results = await getAddress(coords)
        setAddressLoading(false)
        
        if (results) setAddressData(results)
    }
    
    return (
        <View
            key={props.key}
        >
            <AdvancedMarker
                ref={markerRef}
                onClick={onClick}
                position={{ lat: Number(location.latitude), lng: Number(location.longitude) }}
                title={user.username}
            />
            
            {open && (
                <InfoWindow
                    headerDisabled={true}
                    anchor={marker}
                    minWidth={300}
                    maxWidth={340}
                    // style={{ padding: 0, margin: 0, flexShrink: 0 }}
                    // onCloseClick={() => setInfowindowOpen(false)}
                >
                    {addressLoading
                        ? <ThemedText>Loading address...</ThemedText>
                        : (
                            <Pressable
                                onPress={() => setModal('BIP', bip)}
                                disabled={disabled}
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 10,
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        gap: 5,
                                    }}
                                >

                                    <View
                                        style={{
                                            flex: 1,
                                            width: '98%',
                                            flexDirection: 'row',
                                            justfyContent: 'space-between',
                                            alignItems: 'center',
                                            gap: 10,
                                        }}
                                    >

                                        {Boolean(address) && (
                                            <View
                                                style={{
                                                    flex: 1,
                                                    flexGrow: 1,
                                                    width: '100%',
                                                }}
                                            >
                                                <ThemedText bold>
                                                    {`${addressData.streetNumber} ${addressData.streetName}`}
                                                </ThemedText>
                                                <ThemedText bold>
                                                    {`${addressData.cityName}`}
                                                </ThemedText>
                                            </View>
                                        )}

                                        <ThumbList
                                            images={bip.images}
                                        >
                                            <Icon
                                                name='chevron-forward-circle-sharp'
                                                size={30}
                                                color='rgba(255, 255, 255, 0.75)'
                                            />
                                        </ThumbList>

                                    </View>

                                    <Time time={bip.createdAt} />

                                </View>
                                    
                            </Pressable>
                        )
                    }

                </InfoWindow>
            )}
        </View>
    )
}