import React, { useEffect, useState } from 'react'
import {
    useWindowDimensions,
} from 'react-native'
import {
    Screen,
} from '.'
import {
    getPresentation,
} from '../../presentations'
import {
    getSize,
} from '@utils/metrics'

export default () => {

    const dims = useWindowDimensions()

    const [size, setSize] = useState('small')

    useEffect(() => {
        if (dims) setSize(getSize(dims))
    }, [dims])

    // const getSize = () => {
    //     if (dims.width <= 600) setSize('small')
    //     else if (dims.width <= 712) setSize('medium')
    //     else setSize('large')
    // }

    return (
        <Screen
            tabs={false}
            secure={false}
            padded={false}
        >
            {getPresentation('start', size)}
        </Screen>
    )
}