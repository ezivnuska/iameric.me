import React, { useContext } from 'react'
import {
    Image,
    View,
} from 'react-native'
import {
    IconButton,
    ThemedText,
} from '@components'
import classes from '../styles/classes'
import { useTheme } from 'react-native-paper'
import { AppContext } from '../AppContext'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ item, username }) => {

    const theme = useTheme()

    const {
        dispatch,
    } = useContext(AppContext)
    
    const { _id, price, title, desc, vendor, blurb, category, image } = item
    
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingTop: 15,
                paddingHorizontal: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#777',
            }}
        >
            <View
                style={{
                    flexBasis: 'auto',
                    flexGrow: 1,
                    flexShrink: 1,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                    }}
                >
                    {image ? (
                        <View
                            style={{
                                flexBasis: IMAGE_SIZE + 12,
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
                                    borderColor: '#999',
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 5,
                                }}
                            />
                        </View>
                    ) : null}

                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            paddingBottom: 15,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                flexWrap: 'wrap',
                                marginBottom: 5,
                            }}
                        >
                            <ThemedText
                                style={[
                                    classes.productTitle,
                                    {
                                        flexBasis: 'auto',
                                        flexGrow: 0,
                                        marginRight: 15,
                                    }
                                ]}
                            >
                                {title}
                            </ThemedText>
                        </View>

                        {(blurb && blurb.length) ? (
                            <ThemedText>{blurb}</ThemedText>
                        ) : null}

                        {(desc && desc.length) ? (
                            <ThemedText>{desc}</ThemedText>
                        ) : null}

                    </View>

                </View>
                
            </View>
            

            <IconButton
                onPress={() => dispatch({ type: 'SET_FEATURED', featured: item })}
                type='primary'
                iconName='add-outline'
                label={`$${price}`}
                // padded={false}
                align='center'
                style={{
                    // flexBasis: 'auto',
                    flexGrow: 0,
                }}
                textStyles={{
                    // marginRight: 0,
                }}
            />

        </View>
    )
}