import React, { useEffect, useState } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { ThumbList } from './components'
import {
    IconButton,
    ThemedText,
    Time,
} from '@components'
import { useApp } from '@app'
import { useBips } from '@bips'
import { useModal } from '@modal'
import { getBipImages } from '@utils/images'
import { deleteBip } from '@utils/bips'
import { getAddress } from '@utils/map'
import { navigate } from '@utils/navigation'

export default ({ item, onPressed, current = false }) => {

    const { user } = useApp()

    const {
        removeBip,
        // setBipAddress,
        setBipImages,
    } = useBips()

    const { setModal } = useModal()

    const [ loading, setLoading ] = useState(false)
    const [ address, setAddress ] = useState(null)
    const [ street, setStreet ] = useState(null)
    const [ city, setCity ] = useState(null)

    useEffect(() => {
        if (address) {
            const {
                streetNumber,
                streetName,
                cityName,
            } = address
            setStreet(`${streetNumber} ${streetName}`)
            setCity(cityName)
        }
    }, [address])

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
        const results = await getAddress({ lat: latitude, lng: longitude })
        setLoading(false)
        if (results) {
            setAddress(results)
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
        if (__DEV__) return console.log(`Can't delete images in development.`)
        setLoading(true)
        const deletedBip = await deleteBip(id)
        setLoading(false)
        if (deletedBip) removeBip(id)
    }

    const onItemPressed = () => {
        onPressed()
        // navigate('Bips', { screen: 'Bip', params: { id: item._id } })
        setModal('BIP', item)
    }

    return (
        <Pressable
            key={`bip-${item._id}`}
            onPress={onItemPressed}
            style={{
                flex: 1,
                paddingTop: 2,
                paddingBottom: 6,
                paddingHorizontal: 7,
                gap: 3,
                backgroundColor: current ? 'rgba(200, 100, 100, 0.2)' : 'transparent',
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
                <ThemedText bold>{city}</ThemedText>
                <Time time={item.createdAt} />
                {(
                    (item.user && item.user._id === user._id) ||
                    user.role === 'admin'
                ) ? (
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
                    flexDirection: 'row',
                }}
            >
                {(item.images && item.images.length > 0) && (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            gap: 10,
                        }}
                    >
                        <ThumbList
                            images={item.images}
                            loading={loading}
                            // disabled
                            // small
                        />

                        <View
                            style={{
                                flexGrow: 1,
                            }}
                        >
                            {street && <ThemedText bold>{street}</ThemedText>}
                            <ThemedText color='tomato' bold>{item.user?.username || item.user}</ThemedText>

                        </View>
                    </View>
                )}
            </View>


        </Pressable>
    )
}