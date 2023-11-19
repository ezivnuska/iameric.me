import React, { useState } from 'react'
import {
    Text,
    View,
} from 'react-native'
import { Button } from 'antd'
import {
    UserModule,
    VendorSelector,
} from '.'

export default () => {
    const [content, setContent] = useState(null)

    const renderContent = () => {
        switch(content) {
            case 'vendor-list': return <VendorSelector />; break
            case 'user-list': return <UserModule />; break
            default: return null
        }
    }

    const renderOptions = () => content
        ? (
            <Button onClick={() => setContent(null)}>
                <Text>Back</Text>
            </Button>
        ) : (
            <>

                {content !== 'vendor-list' && (
                    <Button onClick={() => setContent('vendor-list')}>
                        <Text>Show Vendors</Text>
                    </Button>
                )}

                {content !== 'user-list' && (
                    <Button onClick={() => setContent('user-list')}>
                        <Text>Show Users</Text>
                    </Button>
                )}

            </>
        )

    return (
        <View>
            
            {renderOptions()}

            {renderContent()}
        </View>
    )
}