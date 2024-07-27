import React, { useState } from 'react'
import { View } from 'react-native'
import { Job } from './components'

export default ({ jobs }) => {
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
        <View
            style={{
                gap: 2,
                marginBottom: 100,
            }}
        >
            {jobs.length && renderJobs()}
        </View>
    )
}