import React from 'react'
import { Screen } from '.'
import {
    HomeContent,
} from '../components'

const HomeScreen = ({ navigation, ...props }) => (
    <Screen {...props}>
        <HomeContent />
    </Screen>
)

export default HomeScreen