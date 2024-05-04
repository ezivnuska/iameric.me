import React, { useEffect } from 'react'
import {
    Screen,
} from '.'
import {
    ImagesView,
    LoadingView,
} from '@components'
import {
    useApp,
    useImages,
    useUser,
} from '@context'
import { loadImages } from '@utils/images'
import { loadUser } from '@utils/user'

export default props => {

    const { userId } = useApp()
    const {
        profile,
        setUser,
        setUserLoading,
        userLoaded,
        userLoading,
    } = useUser()
    const {
        images,
        imagesLoaded,
        imagesLoading,
        setImages,
        setImagesLoading,
    } = useImages()

    useEffect(() => {
        const fetchUser = async () => {
            setUserLoading(true)
            const loadedUser = await loadUser(userId)
            setUserLoading(false)
            if (loadedUser) setUser(loadedUser)
        }
        const fetchImages = async () => {
            setImagesLoading(true)
            const images = await loadImages(userId)
            setImagesLoading(false)
            setImages(images)
        }
        if (!profile) fetchUser()
        else if (!imagesLoaded && !imagesLoading && !images) fetchImages()
    }, [profile])

    if (userLoading) return <LoadingView loading='Loading user...' />
    if (imagesLoading) return <LoadingView loading='Loading images...' />

    return profile && (
        <Screen {...props}>
            <ImagesView images={images} />
        </Screen>
    )
}