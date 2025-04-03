import React, { useEffect, useRef, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Job } from './components'
import { useTheme } from '@context'
import jobs from './jobs'

const JobList = () => {

    const { landscape } = useTheme()

    const [visible, setVisible] = useState(null)

    const listRef = useRef(null)

    useEffect(() => {
        if (visible) {
            // listRef.current.scrollToIndex({ index: visible, animated: true, viewOffset: 0, viewPosition: landscape ? 0 : 0.5 })
            listRef.current.scrollToIndex({ index: visible, animated: true, viewOffset: 0, viewPosition: 0 })
        }
    }, [landscape, visible])

    const handleSelection = index => {
        if (visible === index) setVisible(null)
        else setVisible(index)
    }

    return (
        <FlatList
            ref={listRef}
            data={jobs}
            keyExtractor={(item, index) => `job-${index}`}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            renderItem={({ item, index }) => (
                <Job
                    section={item}
                    index={index}
                    onPress={() => handleSelection(index)}
                    disabled={index === visible}
                    visible={index === visible}
                    key={`job-${index}`}
                />
            )}
        />
    )
}

export default JobList