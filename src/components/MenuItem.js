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
import { AppContext } from '../AppContext'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ item, username }) => {

    const {
        dispatch,
        isLandscape,
    } = useContext(AppContext)
    
    const { _id, price, title, desc, vendor, blurb, category, image } = item
    
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingTop: 15,
                paddingHorizontal: 10,
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
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                flexWrap: isLandscape ? 'nowrap' : 'wrap',
                                marginBottom: 10,
                            }}
                        >
                            <ThemedText
                                style={[
                                    classes.productTitle,
                                    {
                                        flexBasis: 'auto',
                                        flexGrow: 0,
                                        marginBottom: 10,
                                        lineHeight: 35,
                                    }
                                ]}
                            >
                                {title}
                            </ThemedText>
            
                            <IconButton
                                onPress={() => dispatch({ type: 'SET_MODAL', modalType: 'SHOW_PRODUCT', id: item._id })}
                                type='primary'
                                label={`$${price}`}
                                align='center'
                                // style={{ flexGrow: 0 }}
                                padded={isLandscape ? true : false}
                                textStyles={{ lineHeight: 35 }}
                            />
                        </View>

                        {(blurb && blurb.length) ? (
                            <ThemedText
                                style={classes.productBlurb}
                            >
                                {blurb}
                            </ThemedText>
                        ) : null}

                        {(desc && desc.length) ? (
                            <ThemedText
                                style={classes.textDefault}
                            >
                                {desc}
                            </ThemedText>
                        ) : null}

                    </View>

                </View>
                
            </View>

        </View>
    )
}