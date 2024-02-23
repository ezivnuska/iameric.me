import React, { useContext, useEffect, useState } from 'react'
import {
    useWindowDimensions,
    SafeAreaView,
    View,
} from 'react-native'
import AppNavigation from '../navigation/AppNavigation'
import { AppContext } from '../AppContext'
import {
    ModalFactory,
} from '@components'
import {
    Portrait,
    Landscape,
} from '.'
import { getSize, getOrientation } from '@utils/metrics'
import { useTheme } from 'react-native-paper'

export default () => {

    const {
        dispatch,
        modal,
        user,
    } = useContext(AppContext)

    const theme = useTheme()

    const dims = useWindowDimensions()

    const [orientation, setOrientation] = useState('portrait')

    useEffect(() => {
        if (dims) {
            const newOrientation = getOrientation(dims)
            if (newOrientation !== orientation) setOrientation(newOrientation)
        }
    }, [dims])

    return orientation === 'portrait'
        ? <Portrait />
        : <Landscape />
}