import React from 'react'
import {
    Image,
    View,
} from 'react-native'
import {
    IconButton,
    ThemedText,
} from '@components'
import {
    useUser,
} from '@context'
import classes from '@styles/classes'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ onDelete, product, onPress, ...props }) => {

    const { profile, userLoading } = useUser()
    
    return (
        <View
            {...props}
            style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 15,
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
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                    }}
                >
                    {product.image ? (
                        <View
                            style={{
                                flexBasis: IMAGE_SIZE + 12,
                            }}
                        >
                            <Image
                                width={IMAGE_SIZE}
                                height={IMAGE_SIZE}
                                source={{ uri: `${IMAGE_PATH}/${profile.username}/thumb/${product.image.filename}` }}
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
                                columnGap: 15,
                                marginBottom: 3,
                            }}
                        >
                            <ThemedText
                                style={[
                                    classes.productTitle,
                                    {
                                        flexBasis: 'auto',
                                        flexGrow: 0,
                                    }
                                ]}
                            >
                                {product.title}
                            </ThemedText>

                            <ThemedText
                                style={[
                                    classes.productPrice,
                                    {
                                        flexBasis: 'auto',
                                        flexGrow: 0,
                                    },
                                ]}
                            >
                                ${product.price}
                            </ThemedText>
                        </View>

                        <ThemedText style={classes.productBlurb}>{product.blurb}</ThemedText>
                        <ThemedText style={classes.textDefault}>{product.desc}</ThemedText>

                    </View>
                                
                    <View
                        style={{
                            paddingVertical: 4,
                            gap: 6,
                        }}
                    >
                        <IconButton
                            iconName='create-outline'
                            onPress={() => onPress(product)}
                            disabled={userLoading}
                            transparent
                        />
                
                        <IconButton
                            iconName='trash-outline'
                            onPress={() => onDelete(product)}
                            disabled={userLoading}
                            transparent
                        />
                    </View>

                </View>
                
            </View>
        </View>
    )
}