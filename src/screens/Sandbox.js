import React, { useEffect } from 'react'
import { Screen } from './components'
import { Text } from 'react-native-paper'

const Sandbox = props => {

    const people = [
        {
            name: 'Aeris',
            height: '5 foot 8 inches',
        },
        {
            name: 'Courtney',
            height: '5 foot 4 inches',
        },
        {
            name: 'Zach',
            height: '6 foot 1 inches',
        },
        {
            name: 'Eric',
            height: '6 foot 3 inches',
        },
    ]

    const listPeople = () => {
        return people.map(person => <Text>{person.name}: {person.height}</Text>)
    }
    
    return (
        <Screen secure {...props}>
            {listPeople()}
        </Screen>
    )
}

export default Sandbox