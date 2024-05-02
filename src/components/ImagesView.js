import React from 'react'
import {
    View,
} from 'react-native'
import {
    ImageList,
    ScreenContent,
    TitleBar,
} from '@components'
import {
    useModal,
} from '@context'

export default ({ profile }) => {
    const { setModal } = useModal()
    return (
        <View>
            <TitleBar title='Images' />
            <ScreenContent>
                {profile.images && (
                    <ImageList
                        images={profile.images}
                        onSelected={image => setModal('IMAGE', image)}
                    />
                )}
            </ScreenContent>
        </View>
    )
}