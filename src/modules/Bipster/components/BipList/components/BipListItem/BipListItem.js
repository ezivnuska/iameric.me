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
import { navigate } from '@utils/navigation'

export default ({ item }) => {

    const { user } = useApp()

    const {
        removeBip,
        setBipImages,
    } = useBips()

    const [ loading, setLoading ] = useState(false)

    const getImages = async id => {
        setLoading(true)
        const bipImages = await getBipImages(id)
        setBipImages({
            bipId: id,
            images: bipImages,
        })
        setLoading(false)
    }

    useEffect(() => {
        if (!item._id) console.log('Error: cannot get images: item id is undefined.')
        else getImages(item._id)
    }, [])

    const deleteAndRemoveBip = async id => {
        setLoading(true)
        const deletedBip = await deleteBip(id)
        setLoading(false)
        if (deletedBip) {
            removeBip(id)
        }
    }

    return (
        <Pressable
            key={`bip-${item._id}`}
            onPress={() => navigate('Bips', { screen: 'Bip', params: { id: item._id } })}
            style={{
                flex: 1,
                gap: 2,
                paddingBottom: 5,
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
                    />
                ) : null}
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