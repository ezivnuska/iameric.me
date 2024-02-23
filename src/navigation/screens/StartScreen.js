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

export default () => {

    const dims = useWindowDimensions()

    const [size, setSize] = useState('small')

    useEffect(() => {
        if (dims) getSize()
    }, [dims])

    const getSize = () => {
        if (dims.width <= 400) setSize('small')
        else if (dims.width <=600) setSize('medium')
        else setSize('large')
    }

    return (
        <Screen
            tabs={false}
            secure={false}
        >
            {getPresentation(size)}
        </Screen>
    )
}