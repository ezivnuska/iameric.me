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
    useUser,
    useModal,
} from '@context'
import { loadImages } from '@utils/images'

export default () => {

    const { profile, setUserLoading, updateImages } = useUser()
    const { setModal } = useModal()
    const profileImages = useMemo(() => profile.images, [profile])

    useEffect(() => {
        const init = async () => {
            setUserLoading(true)
            const images = await loadImages(profile._id)
            setUserLoading(false)
            updateImages(images)
        }
        init()
    }, [])

    return (
        <Screen
            titleComponent={<ScreenTitle title='Images' />}
        >
            <View style={{ paddingHorizontal: 10 }}>
                {profileImages && (
                    <ImageList
                        images={profileImages}
                        onSelected={image => setModal('IMAGE', image)}
                    />
                )}
            </View>
        </Screen>
    )
}