import React, { useState } from 'react'
import {
    Pressable,
    Text,
    View,
} from 'react-native'
import {
    UserSelector,
    VendorSelector,
} from '.'

const Tab = ({ active, label, press, type }) => (
    <Pressable
        onPress={() => press(type)}
        style={{ flex: 1 }}
    >
        <Text style={{
            paddingVertical: 10,
            textAlign: 'center',
            backgroundColor: active ? '#0af' : '#fff'
        }}>{label}</Text>
    </Pressable>
)

export default () => {

    const [content, setContent] = useState('vendor-list')

    const renderContent = () => {
        switch(content) {
            case 'vendor-list': return <VendorSelector />; break
            case 'user-list': return <UserSelector />; break
            default: return null
        }
    }

    const renderOptions = () => (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch',
            }}
        >
            <Tab
                active={content === 'vendor-list'}
                label={'Vendors'}
                press={() => setContent('vendor-list')}
                type={'vendor-list'}
            />

            <Tab
                active={content === 'user-list'}
                label={'Users'}
                press={() => setContent('user-list')}
                type={'user-list'}
            />

        </View>
    )

    return (
        <View>
            
            {renderOptions()}

            {renderContent()}
        </View>
    )
}