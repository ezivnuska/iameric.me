import React, { useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    EmptyStatus,
    ImageList,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'
import {
    useModal,
} from '@context'
import { loadFullUser } from '@utils/data'

export default ({ navigation, route }) => {
    const { setModal } = useModal()

    const { id } = route.params
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const init = async () => {
            const result = await loadFullUser(id)
            setCurrentUser(result)
        }
        init()
    }, [])

    useEffect(() => {
        if (currentUser && id !== currentUser._id) init()
    }, [id])

    return currentUser ? (
        <Screen
            titleComponent={
                <ScreenTitle
                    backLabel='Users'
                    title={currentUser.username}
                    navigation={navigation}
                />
            }
        >
            {currentUser.images ? (
                <View
                    style={{ marginHorizontal: 10 }}
                >
                    <ImageList
                        images={currentUser.images}
                        onSelected={image => {
                            setModal('IMAGE', image)
                        }}
                    />
                </View>
            ) : <EmptyStatus status='No images yet.' />}
            
        </Screen>
    ) : null
}