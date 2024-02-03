import React from 'react'
import {
    Image,
    Pressable,
    Text,
    View,
} from 'react-native'
import classes from '../styles/classes'
import Icon from 'react-native-vector-icons/Ionicons'
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
                    <Text
                        style={[
                            classes.headerSecondary,
                            { color: theme?.colors.textDefault },
                        ]}
                    >
                        {title}
                    </Text>

                    <Pressable
                        onPress={onPress}
                        style={{
                            flexBasis: 'auto',
                            flexShrink: 1,
                            flexGrow: 0,
                            backgroundColor: 'blue',
                            borderRadius: 6,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 5,
                        }}
                    >
                        <Icon
                            name='add-outline'
                            size={16}
                            color={theme?.colors.buttonLabel}
                            style={{ flexBasis: 'auto', flexShrink: 1 }}
                        />

                        <Text
                            style={[
                                classes.buttonText,
                                {
                                    flexBasis: 'auto',
                                    flexShrink: 1,
                                    color: theme?.colors.buttonLabel,
                                },
                            ]}
                        >
                            ${price}
                        </Text>

                    </Pressable>

                    {/* <Pressable onPress={onPress}>
                        <Text style={{ lineHeight: 24 }}>
                            ${price}
                        </Text>
                    </Pressable> */}
                </View>
                
            </View>

            {(blurb && blurb.length) ? (
                <Text
                    style={[
                        classes.textDefault,
                        { color: theme?.colors.textDefault },
                    ]}
                >
                    {blurb}
                </Text>
            ) : null}

            {(desc && desc.length) ? (
                <Text
                    style={[
                        classes.textDefault,
                        { color: theme?.colors.textDefault },
                    ]}
                >
                    {desc}
                </Text>
            ) : null}

        </View>
    )
}