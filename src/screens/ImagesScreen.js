import React, { useEffect, useMemo } from 'react'
import {
    ImageList,
} from '@components'
import {
    Screen,
} from '.'
import {
    useApp,
    useUser,
    useModal,
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
    const { setModal } = useModal()
    // const profileImages = useMemo(() => profile ? profile.images : null, [profile])

    useEffect(() => {
        const init = async () => {
            if (!profile) {
                const loadedUser = await loadUser(userId)
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
            <ImageList
                images={profile.images}
                onSelected={image => setModal('IMAGE', image)}
            />
        </Screen>
    ) : null
}