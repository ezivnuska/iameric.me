import React from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    IconButton,
    ThemedText,
} from '@components'
import classes from '../styles/classes'
import { useTheme } from 'react-native-paper'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ item, username, onPress }) => {

    const theme = useTheme()
    
    const { _id, price, title, desc, vendor, blurb, category, image } = item
    
    return (
        <View
            style={{
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                paddingVertical: 10,
            }}
        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    // alignItems: 'baseline',
                }}
            >
                {image ? (
                    <View
                        style={{
                            marginBottom: 10,
                            flexBasis: IMAGE_SIZE + 10,
                            flexGrow: 0,
                            flexShrink: 0,
                        }}
                    >
                        <Image
                            width={IMAGE_SIZE}
                            height={IMAGE_SIZE}
                            source={{ uri: `${IMAGE_PATH}/${username}/thumb/${image.filename}` }}
                            style={{
                                resizeMode: 'stretch',
                                width: IMAGE_SIZE,
                                height: IMAGE_SIZE,
                                borderWidth: 1,
                                borderColor: theme?.colors.border,
                            }}
                        />
                    </View>
                ) : null}

                <View
                    style={{
                        flexBasis: 'auto',
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'fex-start',
                        alignItems: 'flex-start',
                    }}
                >
                    <ThemedText style={classes.userTitle}>
                        {title}
                    </ThemedText>

                    <IconButton
                        type='primary'
                        iconName='add-outline'
                        label={`$${price}`}
                        padded={false}
                        align='center'
                        style={{
                            flexBasis: 'auto',
                            flexShrink: 1,
                            flexGrow: 0,
                            paddingLeft: 7,
                            paddingRight: 7,
                        }}
                        textStyles={{
                            lineHeight: 'auto',
                            paddingVertical: 2,
                            marginRight: 0,
                        }}
                    />

                </View>
                
            </View>

            {(blurb && blurb.length) ? (
                <ThemedText>{blurb}</ThemedText>
            ) : null}

            {(desc && desc.length) ? (
                <ThemedText>{desc}</ThemedText>
            ) : null}

        </View>
    )
}