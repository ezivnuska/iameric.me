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

export default ({ images }) => {
    const { setModal } = useModal()
    return (
        <View>
            <TitleBar title='Images' />
            <ScreenContent>
                {images && (
                    <ImageList
                        images={images}
                        onSelected={image => setModal('IMAGE', image)}
                    />
                )}
            </ScreenContent>
        </View>
    )
}