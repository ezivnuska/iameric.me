import React from 'react'
import { Screen } from './components'
import { JobList } from '@components'

const WorkScreen = props => (
    <Screen full {...props}>
        <JobList />
    </Screen>
)

export default WorkScreen