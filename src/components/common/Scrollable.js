import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'

const Scrollable = ({ children }) => {

    const [dimensions, setDimensions] = useState(null)

    const onLayout = e => {
        const parentWidth = e.nativeEvent.target.offsetParent.clientWidth 
        const parentHeight = e.nativeEvent.target.offsetParent.clientHeight 
        setDimensions({
            width: parentWidth,
            height: parentHeight,
        })
    }

    return (
        <View
            // onLayout={onLayout}
            style={{
                flex: 1,
                flexGrow: 1,
                // background: 'pink',
            }}
        >
            {dimensions && (
                <ScrollView
                    style={{
                        flex: 1,
                        // alignSelf: 'stretch',
                        // flexGrow: 1,
                        // width: dimensions.width,
                        // maxWidth: dimensions.width,
                        // height: dimensions.height,
                        // maxHeight: dimensions.height,
                        background: 'blue',
                    }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        // flex: 1,
                        width: '100%',
                        // margin: 10,
                        // flexGrow: 1,
                        padding: 10,
                        // background: 'green',
                        borderWidth: 1,
                        borderStyle: 'dotted',
                        // margin: 5,
                    }}
                >
                    {/* <View style={{ flexBasis: 'auto' }}> */}
                        {children}
                    {/* </View> */}
                </ScrollView>
            )}
        </View>
    )
}

export default Scrollable