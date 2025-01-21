import React from 'react'
import { Text } from 'react-native'
import { JobList, Screen } from '@components'
import { useTheme } from '@context'

const WorkScreen = props => {
    
    const { styles } = useTheme()
    
    return (
        <Screen {...props}>
            <Text style={[styles.heading, styles.paddedVertical]}>Places I've Worked</Text>
            <JobList />

        </Screen>
    )
}

export default WorkScreen