import React from 'react'
import { Text } from 'react-native'
import { JobList, Screen } from '@components'
import { useApp } from '@context'
import { useStyles } from '@styles'

const WorkScreen = props => {
    const { theme } = useApp()
    const styles = useStyles(theme)
    return (
        <Screen {...props}>
            <Text style={[styles.heading, styles.paddedVertical]}>Places I've Worked</Text>
            <JobList />

        </Screen>
    )
}

export default WorkScreen