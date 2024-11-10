import React, { useEffect, useState } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    ActivityIndicator,
    IconButton,
    ThemedText,
    ThumbList,
    Time,
} from '@components'
import { useUser } from '@user'
import { useBips } from '@modules/Bipster'
import { useSocket } from '@socket'
import { getBipImages } from '@utils/images'
import { deleteBip } from '@utils/bips'
import { getAddress } from '@utils/map'

export default ({ item, onDeleted, onPressed, current = false }) => {

    const { user } = useUser()
    const { setBipImages } = useBips()
    const { socket } = useSocket()

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
        if (deletedBip) {
            onDeleted(deletedBip._id)
            socket.emit('bip_deleted', deletedBip)
        }   
    }

    return address ? (
        <Pressable
            key={`bip-${item._id}`}
            onPress={onPressed}
            style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                gap: 10,
                paddingVertical: 6,
                paddingHorizontal: 10,
                backgroundColor: current ? 'rgba(200, 100, 100, 0.2)' : 'transparent',
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
            }}
        >
            {(item.images && item.images.length > 0) && (
                <View
                    style={{
                        flex: 1,
                        flexBasis: 'auto',
                        flexGrow: 0,
                    }}
                >
                    <ThumbList
                        images={item.images}
                        loading={loading}
                        // disabled
                        // small
                    />
                    
                </View>
            )}

            <View
                style={{
                    flexGrow: 1,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        // justifyContent: 'flex-start',
                        justifyContent: 'space-between',
                        gap: 10,
                    }}
                >
                    <ThemedText bold>{city}</ThemedText>
                    <Time time={item.createdAt} />
                </View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        gap: 10,
                    }}
                >
                    {/* <ThemedText color='tomato' bold>{item.user?.username || item.user}</ThemedText> */}
                    <ThemedText>{street}</ThemedText>
                </View>
            </View>

            {(
                (item.user && item.user._id === user._id) ||
                    user.role === 'admin'
                ) ? (
                    <View
                        style={{
                            flexGrow: 0,
                        }}
                    >
                        <IconButton
                            name='close-sharp'
                            size={20}
                            color='tomato'
                            onPress={() => deleteAndRemoveBip(item._id)}
                            disabled={loading}
                        />
                    </View>
                ) : null
            }

        </Pressable>
    ) : null//<ActivityIndicator />
}