import React, { useEffect, useMemo } from 'react'
import {
    ImageList,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'
import {
    View,
} from 'react-native'
import {
    useApp,
    useUser,
    useModal,
} from '@context'
import { loadImages } from '@utils/images'
import { loadUser } from '@utils/user'

export default props => {

    const { userId } = useApp()
    const { profile, setUserLoading, updateImages } = useUser()
    const { setModal } = useModal()
    const profileImages = useMemo(() => profile ? profile.images : null, [profile])

    // useEffect(() => {
        
    //     init()
    // }, [])

    useEffect(() => {
        const init = async () => {
            if (!profile) {
                loadUser(userId)
            } else {
                if (!profileImages) {
                    setUserLoading(true)
                    const images = await loadImages(userId)
                    setUserLoading(false)
                    updateImages(images)
                }
            }
        }
        init()
    }, [profile])

    return profileImages ? (
        <Screen {...props}>
            <ScreenTitle title='Images' />
            <View style={{ paddingHorizontal: 10 }}>
                {profileImages && (
                    <ImageList
                        images={profileImages}
                        onSelected={image => setModal('IMAGE', image)}
                    />
                )}
            </View>
        </Screen>
    ) : null
}