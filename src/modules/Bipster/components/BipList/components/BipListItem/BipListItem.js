import React, { useEffect, useState } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { ImageList } from './components'
import {
    IconButton,
    ThemedText,
    Time,
} from '@components'
import { useApp } from '@app'
import { useBips } from '@bips'
import { getBipImages } from '@utils/images'
import { deleteBip } from '@utils/bips'
import { getAddress } from '@utils/map'
import { navigate } from '@utils/navigation'

export default ({ item }) => {

    const { user } = useApp()

    const {
        removeBip,
        // setBipAddress,
        setBipImages,
    } = useBips()

    const [ loading, setLoading ] = useState(false)
    const [ address, setAddress ] = useState(null)

    const getImages = async id => {
        setLoading(true)
        const bipImages = await getBipImages(id)
        setBipImages({
            bipId: id,
            images: bipImages,
        })
        setLoading(false)
    }

    const fetchAddress = async location => {
        const { latitude, longitude } = location
        setLoading(true)
        const { results } = await getAddress({ lat: latitude, lng: longitude })
        setLoading(false)
        if (results) {
            const currentAddress = results[0]
            setAddress(currentAddress.formatted_address)
            // setBipAddress({ bipId: item._id, address: currentAddress.formatted_address })
        }
    }

    useEffect(() => {
        if (!item._id) console.log('Error: cannot get images: item id is undefined.')
        else getImages(item._id)

        if (!address) {
            if (item.location) fetchAddress(item.location)
        }
    }, [])

    const deleteAndRemoveBip = async id => {
        setLoading(true)
        const deletedBip = await deleteBip(id)
        setLoading(false)
        if (deletedBip) removeBip(id)
    }

    return (
        <Pressable
            key={`bip-${item._id}`}
            onPress={() => navigate('Bips', { screen: 'Bip', params: { id: item._id } })}
            style={{
                flex: 1,
                paddingBottom: 7,
            }}
        >
            <View
                style={{
                    flexGrow: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 7,
                }}
            >
                <ThemedText bold>{item.user.username}</ThemedText>
                <Time time={item.createdAt} />
                {item.user && item.user._id === user._id ? (
                    <IconButton
                        name='close-sharp'
                        size={20}
                        color='tomato'
                        onPress={() => deleteAndRemoveBip(item._id)}
                        disabled={loading}
                    />
                ) : null}
            </View>

            <View
                style={{
                    flexGrow: 0,
                    marginBottom: 3,
                }}
            >
                {address
                    ? <ThemedText>{address}</ThemedText>
                    : loading
                        ? <ThemedText>Getting address...</ThemedText>
                        : null//<ThemedText>Address not available.</ThemedText>
                }
            </View>

            {(item.images && item.images.length > 0) && (
                <View style={{ flexGrow: 1 }}>
                    <ImageList
                        images={item.images}
                        loading={loading}
                        // disabled
                        // small
                    />
                </View>
            )}

        </Pressable>
    )
}