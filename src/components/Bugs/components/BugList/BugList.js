import React from 'react'
import { View } from 'react-native'
import { BugListItem } from './components'

const BugList = ({ bugs, onDelete, ...props }) => (
    <View
        {...props}
        style={{
            flexBasis: 'auto',
            gap: 10,
        }}
    >
        {bugs.map((bug, index) => (
            <BugListItem
                key={`bug-${index}`}
                item={bug}
                onDelete={onDelete}
            />
        ))}
    </View>
)

export default BugList