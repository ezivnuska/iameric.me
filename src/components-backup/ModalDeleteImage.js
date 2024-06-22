import React from 'react'
import { View } from 'react-native'
import { IconButton } from '@components'
import { useImages } from '@context'
import { classes } from '@styles'

export default ({ callback }) => {
    
    const { imagesLoading } = useImages()
    
    return (
        <View style={classes.centerV}>
            <IconButton
                type='primary'
                label='Delete Image'
                onPress={callback}
                disabled={imagesLoading}
                padded
            />
        </View>
    )
}