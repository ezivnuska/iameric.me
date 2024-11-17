import React, { useState } from 'react'
import { View } from 'react-native'
import { Job } from './components'

const JobList = ({ jobs }) => {
    const [visible, setVisible] = useState(null)

    const handleSelection = index => {
        if (visible === index) setVisible(null)
        else setVisible(index)
    }

    const renderJobs = () => jobs.map((section, index) => (
        <Job
            section={section}
            index={index}
            onPress={() => handleSelection(index)}
            disabled={index === visible}
            visible={index === visible}
            key={`section-${index}`}
        />
    ))

    return (
        <View style={{ gap: 1, paddingHorizontal: 10 }}>
            {jobs.length && renderJobs()}
        </View>
    )
}

export default JobList