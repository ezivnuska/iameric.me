import React, { useEffect, useRef } from 'react'
import {
    FlatList,
    ScrollView,
    View,
} from 'react-native'
import { BipListItem } from './components'
import { ThemedText } from '@components'

export default ({ bips, loading, onDeleted, onSelected, currentIndex = null }) => {
    
    const listRef = useRef()
    
    // useEffect(() => {
    //     console.log('bips', bips)
    // }, [])

    useEffect(() => {
        if (currentIndex) {
            if (listRef && listRef.current) {
                listRef.current.scrollToIndex({ animated: true, index: currentIndex })
            }
        }
    }, [currentIndex])

    const renderStatus = status => (
        <View
            style={{
                paddingVertical: 6,
                paddingHorizontal: 10,
            }}
        >
            <ThemedText>{status}</ThemedText>
        </View>
    )

    return loading
        ? renderStatus('Loading Bips...')
        : bips.length > 0
            ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        flex: 1,
                        flexGrow: 1,
                    }}
                    contentContainerStyle={{
                        flex: 1,
                    }}
                >
                    <FlatList
                        ref={listRef}
                        data={bips}
                        listKey={() => '@bips'}
                        keyExtractor={(item, index) => `${index}-bip-${item._id}`}
                        renderItem={({ item, index }) => (
                            <BipListItem
                                item={item}
                                current={currentIndex === index}
                                onPressed={() => onSelected(index)}
                                onDeleted={id => onDeleted(id, index)}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1 }}
                        contentContainerStyle={{ flex: 1 }}
                    />
                </ScrollView>
            )
            : renderStatus('No bips reported.')
}