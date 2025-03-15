import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { ImageLoader } from '@components'
import { useTheme } from '@context'

const ImageList = ({ images, refreshing, user, onPress, onRefresh, list = false }) => {

    const { landscape } = useTheme()

    const [maxDims, setMaxDims] = useState(null)

    // useEffect(() => {
    //     console.log('user', user?.images)
    // }, [user])

    // useEffect(() => {
    //     console.log('images.length', images.length)
    // }, [images])

    function onLayout(e) {

        if (e.nativeEvent.target.offsetParent) {

            setMaxDims({
                width: e.nativeEvent.target.offsetParent.clientWidth,
                height: e.nativeEvent.target.offsetParent.clientHeight,
            })
        }
    }

    const getNumColumns = () => (!list && !landscape) ? 2 : 1

    const separation = list ? 50 : 0
    
    return (
        <View
            onLayout={onLayout}
            style={{ flex: 1 }}
        >
            {maxDims && (
                <FlatList
                    ItemSeparatorComponent={() => <View style={{ height: separation, width: separation }} />}
                    key={`image-list-${user._id}-${getNumColumns()}`}
                    horizontal={landscape}
                    numColumns={getNumColumns()}
                    data={images}
                    extraData={images}
                    keyExtractor={item => `image-${item._id}`}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    initialNumToRender={6}
                    renderItem={({ item }) => (
                        <ImageLoader
                            image={item}
                            user={item.user}
                        />
                    )}
                />
            )}
        </View>
    )
}

export default ImageList