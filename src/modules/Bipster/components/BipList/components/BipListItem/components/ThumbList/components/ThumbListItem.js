import React from 'react'
import {
    Image,
    View,
} from 'react-native'
import { IMAGE_PATH } from '@config'
// import { useApp } from '@app'

export default ({ path, size, ...props }) => {
    const assetPath = process.env.IMAGE_PATH || IMAGE_PATH

    // const { theme } = useApp()

    return (
        <View
            style={{
                width: size,
                height: size,
                backgroundColor: '#000',
                borderWidth: 1,
                // borderColor: '#fff',//theme?.colors.border,
                // shadowColor: '#000',//theme?.colors.shadow,
                // shadowOffset: {
                //     width: 2,
                //     height: 2,
                // },
                // shadowOpacity: 1,//0.5,
                // shadowRadius: 3,
                // elevation: 3,
                ...props.style,
            }}
        >
            <Image
                {...props}
                width={size}
                height={size}
                source={{ uri: `${assetPath}/${path}` }}
                resizeMode='cover'
                style={[
                    {
                        width: size,
                        height: size,
                        opacity: 0.75,
                    },
                ]}
            />
        </View>
    )
}