import React, { useMemo, useState } from 'react'
import { FlatList, View } from 'react-native'
import { ImageLoader } from '@components'
import { useTheme } from '@context'

const ImageList = ({ images, refreshing, user, onRefresh, list = false }) => {

    const { landscape } = useTheme()

    const [maxDims, setMaxDims] = useState(null)

    function onLayout(e) {

        if (e.nativeEvent.target.offsetParent) {

            setMaxDims({
                width: e.nativeEvent.target.clientWidth / numColumns,
                height: e.nativeEvent.target.clientHeight / numColumns,
            })
        }
    }

    const numColumns = useMemo(() => (!list && !landscape) ? 3 : 1, [list, landscape])

    const separation = list ? 50 : 0
    
    return (
        <View
            onLayout={onLayout}
            style={{ flex: 1 }}
        >
            {maxDims && (
                <FlatList
                    ItemSeparatorComponent={() => <View style={{ height: separation, width: separation }} />}
                    key={`image-list-${user._id}-${numColumns}`}
                    horizontal={landscape}
                    numColumns={numColumns}
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
                            maxDims={maxDims}
                        />
                    )}
                />
            )}
        </View>
    )
}

export default ImageList