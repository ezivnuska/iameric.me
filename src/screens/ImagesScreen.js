import React, { useEffect, useMemo } from 'react'
import {
    ImageList,
    UserModal,
} from '@components'
import {
    Screen,
} from '.'
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
        setUserModal,
        updateImages,
    } = useUser()
    // const profileImages = useMemo(() => profile ? profile.images : null, [profile])

    useEffect(() => {
        const init = async () => {
            if (!profile) {
                console.log('* warning * ImagesScreen needs to load user')
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
        init()
    }, [profile])

    return profile && profile.images ? (
        <Screen {...props}>
            <ImageList
                images={profile.images}
                onSelected={image => {
                    console.log('image selected', image)
                    setUserModal('IMAGE', image)
                }}
            />
        </Screen>
    ) : null
}