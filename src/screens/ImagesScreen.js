import React from 'react'
import {
    Screen,
} from '.'
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

export default props => {

    const {
        profile,
        userLoading,
    } = useUser()

    const {
        imagesLoading,
    } = useImages()

    if (userLoading) return <LoadingView loading='Loading user...' />
    if (imagesLoading) return <LoadingView loading='Loading images...' />

    return profile && (
        <Screen {...props}>
            <TitleBar title='Images' />
            <ScreenContent>
                <ImageList />
            </ScreenContent>
        </Screen>
    )
}