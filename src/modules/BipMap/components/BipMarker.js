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
import { getAddress } from '@utils/map'
import { navigate } from '@utils/navigation'

export default ({ bip, onClick, open = false, ...props }) => {

    const { _id, location, user } = bip

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

    const onMarkerPressed = () => {
        // onClear()
        navigate('Bips', { screen: 'Bip', params: { id: _id } })
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
                    minWidth={270}
                    // maxWidth={250}
                    // onCloseClick={() => setInfowindowOpen(false)}
                >
                    <Pressable
                        onPress={onMarkerPressed}
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