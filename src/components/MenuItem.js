import React from 'react'
import {
    Image,
    Pressable,
    Text,
    View,
} from 'react-native'
import main from '../styles/main'
import classes from '../styles/classes'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ item, username, onPress }) => {
    
    const { _id, price, title, desc, vendor, blurb, category, image } = item
    
    return (
        <View
            style={{
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                paddingBottom: 10,
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
                        flexBasis: 'auto',
                    }}
                >
                    <Text
                        style={[
                            classes.headerSecondary,
                            {
                                // flexBasis: 'auto',
                                // flexGrow: 1,
                                // flexBasis: '80%',
                                lineHeight: 24,
                            }
                        ]}
                    >
                        {title}
                    </Text>

                    <Pressable
                        onPress={onPress}
                    >
                        <Text
                            style={[
                                classes.textDefault,
                                {
                                    // flexBasis: '20%',
                                    lineHeight: 24,
                                }
                            ]}
                        >
                            ${price}
                        </Text>
                    </Pressable>
                </View>
                
            </View>
            {(blurb && blurb.length) ? <Text style={classes.textDefault}>{blurb}</Text> : null}
            {(desc && desc.length) ? <Text style={classes.textDefault}>{desc}</Text> : null}

        </View>
    )
}