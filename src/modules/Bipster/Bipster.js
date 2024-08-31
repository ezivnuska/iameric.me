import React from 'react'
import {
    ScrollView,
    View,
} from 'react-native'
import { BipList } from './components'

export default ({ bips, currentIndex = null }) => (
    <View style={{ flex: 1 }}>
        
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{ flex: 1 }}
        >
            <BipList bips={bips} currentIndex={currentIndex} />
        </ScrollView>
        
    </View>
)