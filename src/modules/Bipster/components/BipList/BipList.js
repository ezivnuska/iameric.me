import React, { useEffect, useRef } from 'react'
import { FlatList } from 'react-native'
import { BipListItem } from './components'

export default ({ bips, currentIndex = null }) => {
    const listRef = useRef()
    useEffect(() => {
        if (listRef && listRef.current) {
            if (currentIndex) {
                listRef.current.scrollToIndex({ animated: true, index: currentIndex })
            }
        }
    }, [currentIndex])
    return (
        <FlatList
            ref={listRef}
            data={bips}
            listKey={() => 'bips'}
            keyExtractor={(item, index) => `${index}-bip-${item._id}`}
            renderItem={({ item, index }) => <BipListItem item={item} current={currentIndex === index} />}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{ flex: 1 }}
        />
    )
}