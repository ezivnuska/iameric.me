import React, { useEffect } from 'react'
import {
    Screen,
} from '.'
import {
    ImagesView,
} from '@components'
import {
    useApp,
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
        updateImages,
    } = useUser()

    useEffect(() => {
        const init = async () => {
            if (!profile) {
                setUserLoading(true)
                const loadedUser = await loadUser(userId)
                setUserLoading(false)
                if (loadedUser) setUser(loadedUser)
            } else {
                if (!profile.images) {
                    setUserLoading(true)
                    const images = await loadImages(userId)
                    setUserLoading(false)
                    updateImages(images)
                }
            }
        }
        if (userId) init()
    }, [userId, profile])

    return profile && profile.images ? (
        <Screen {...props}>
            <ImagesView profile={profile} />
        </Screen>
    ) : null
}