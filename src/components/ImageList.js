import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, View } from 'react-native'
import { ImageLoader } from '@components'
import { useTheme } from '@context'

const ImageList = ({ images, refreshing, user, onRefresh, list = false }) => {

    const { landscape } = useTheme()

    const [maxDims, setMaxDims] = useState(null)
    
    const numColumns = useMemo(() => (!list && !landscape) ? 3 : 1, [list, landscape])

    const containerRef = useRef()

    useEffect(() => {
        if (containerRef.current) {
            const { clientWidth, clientHeight } = containerRef.current

            setMaxDims(list ? {
                width: clientWidth,
                height: clientHeight,
            } : {
                width: clientWidth / numColumns,
                height: clientWidth / numColumns,
            })
        }
    }, [containerRef, numColumns])


    const separation = list ? 20 : 0
    
    return (
        <View
            ref={containerRef}
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