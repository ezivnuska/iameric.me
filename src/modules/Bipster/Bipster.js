import React, { useEffect, useRef } from 'react'
import {
    FlatList,
    ScrollView,
} from 'react-native'
import { BipListItem } from './components'

export default ({ bips, onSelected, currentIndex = null }) => {
    const listRef = useRef()
    useEffect(() => {
        if (listRef && listRef.current) {
            if (currentIndex) {
                listRef.current.scrollToIndex({ animated: true, index: currentIndex })
            }
        }
    }, [currentIndex])
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{ flex: 1 }}
        >
            <FlatList
                ref={listRef}
                data={bips}
                listKey={() => 'bips'}
                keyExtractor={(item, index) => `${index}-bip-${item._id}`}
                renderItem={({ item, index }) => (
                    <BipListItem
                        item={item}
                        current={currentIndex === index}
                        onPressed={() => onSelected(index)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                contentContainerStyle={{ flex: 1 }}
            />
        </ScrollView>
    )
}