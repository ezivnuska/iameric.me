import React from 'react'
import {
    HomeContent,
    Screen,
} from '../components'

const HomeScreen = ({ navigation, ...props }) => (
    <Screen {...props}>
        <HomeContent />
    </Screen>
)

export default HomeScreen