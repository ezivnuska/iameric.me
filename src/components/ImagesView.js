import React from 'react'
import {
    View,
} from 'react-native'
import {
    ImageList,
    LoadingView,
    ScreenContent,
    TitleBar,
} from '@components'
import {
    useImages,
    useUser,
} from '@context'

export default () => {

    const {
        userLoading,
    } = useUser()

    const {
        images,
        imagesLoading,
    } = useImages()

    if (userLoading) return <LoadingView loading='Loading user...' />
    if (imagesLoading) return <LoadingView loading='Loading images...' />

    return (
        <View>
            <TitleBar title='Images' />
            <ScreenContent>
                <ImageList images={images} />
            </ScreenContent>
        </View>
    )
}