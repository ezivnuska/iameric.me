import React, { useEffect, useMemo, useState } from 'react'
import {
    Image,
    Pressable,
} from 'react-native'
import { ThemedText } from '@components'
import { useApp } from '@app'
// import { getProfileImagePathFromUser } from '@utils/images'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({ item, onPress, ...props }) => {
    // let imagePath = getProfileImagePathFromUser(item)
    
    const { theme } = useApp()

    return (
        <Pressable
            onPress={() => onPress(item)}
            style={[
                {
                    flexBasis: 'auto',
                    flexGrow: 1,
                    flexShrink: 0,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: 12,
                    flexWrap: 'nowrap',
                    paddingBottom: 10,
                },
                props.style,
            ]}
        >
            {/* <Image
                style={{
                    flexBasis: 'auto',
                    flexGrow: 0,
                    width: 50,
                    height: 50,
                    resizeMode: 'center',
                }}
                source={imagePath}
            /> */}

            <Icon
                name={item.userId ? 'ellipse' : 'ellipse-outline'}
                size={18}
                color={item.userId ? theme?.colors.statusOn : theme?.colors.statusOff}
            />

            {/* {item.userId && item.available && (
                <Icon
                    name={'move-outline'}
                    size={18}
                    color={theme?.colors.textDefault}
                />
            )} */}
            
            <ThemedText>{item.username || item.socketId}</ThemedText>

        </Pressable>
    )
}