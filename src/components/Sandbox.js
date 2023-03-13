import React, { useContext } from 'react'
import {
    View,
} from 'react-native-web'
import {
    AvatarModule,
    ImageList,
    UserDisplay,
} from '../components'
import { AppContext } from '../AppContext'

const Sandbox = () => {
    const { state } = useContext(AppContext)
    const { user } = state

    return (
        <View>
            <AvatarModule />
            <ImageList user={user} />
            <UserDisplay />
        </View>
    )
}

export default Sandbox