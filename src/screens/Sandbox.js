import React from 'react'
import { Screen } from './components'
import { DateSelector } from '@components'

const Sandbox = props => {

    const onChangeDate = value => {
        // console.log('new date', value)
    }
    
    return (
        <Screen secure {...props}>
            <DateSelector onChange={onChangeDate} />
        </Screen>
    )
}

export default Sandbox