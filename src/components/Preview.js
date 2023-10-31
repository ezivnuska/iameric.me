import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    View,
} from 'react-native'
import { AppContext } from '../AppContext'

export default ({ height, width, imageURI }) => {

    const { dims } = useContext(AppContext)

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <Image
                width={width}
                height={height}
                style={{
                    width,
                    height,
                    resizeMode: 'cover',
                    borderWidth: 1,
                }}
                source={{ uri: imageURI }}
            />
        </View>
    )
}