import React, { useEffect } from 'react'
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

    const { profile, updateImages } = useUser()
    const { setModal } = useModal()

    useEffect(() => {
        const init = async () => {
            const images = await loadImages(profile._id)
            updateImages(images)
        }
        init()
    }, [])

    return (
        <Screen
            titleComponent={<ScreenTitle title='Images' />}
        >
            {profile.images && (
                <View style={{ paddingHorizontal: 10 }}>
                    <ImageList
                        images={profile.images}
                        // username={user.username}
                        onSelected={image => {
                            console.log('selected image', image)
                            setModal('IMAGE', image._id)
                        }}
                    />
                </View>
            )}
        </Screen>
    )
}