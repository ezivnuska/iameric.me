import React, { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import {
    AdvancedMarker,
    InfoWindow,
    useAdvancedMarkerRef
} from '@vis.gl/react-google-maps'
import {
    ThemedText,
    Time,
} from '@components'
import { useModal } from '@modal'
import { getAddress } from '@utils/map'
import { navigate } from '@utils/navigation'

export default ({ bip, onClick, disabled = false, open = false, ...props }) => {

    const { _id, location, user } = bip

    const { setModal } = useModal()

    // const [ infowindowOpen, setInfowindowOpen ] = useState(false)
    const [ address, setAddress ] = useState(null)
    const [ addressLoading, setAddressLoading ] = useState(false)

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
        
        if (results) {
            const { streetNumber, streetName, cityName } = results
            setAddress(`${cityName}\n${streetNumber} ${streetName}`)
        }
    }
    
    return (
        <View key={props.key}>
            <AdvancedMarker
                ref={markerRef}
                onClick={onClick}
                position={{ lat: Number(location.latitude), lng: Number(location.longitude) }}
                title={user.username}
            />

            {open && (
                <InfoWindow
                    // content={}
                    headerDisabled={true}
                    // headerContent={<View>{bip.createdAt}</View>}
                    // headerContent='hello'
                    anchor={marker}
                    // minWidth={270}
                    maxWidth={300}
                    // onCloseClick={() => setInfowindowOpen(false)}
                >
                    <Pressable
                        onPress={() => setModal('BIP', bip)}
                        disabled={disabled}
                        style={{ flex: 1 }}
                    >
                        <ThemedText>{address ? address : addressLoading ? 'Loading...' : ' '}</ThemedText>
                        <Time time={bip.createdAt} />
                    </Pressable>

                </InfoWindow>
            )}
        </View>
    )
}