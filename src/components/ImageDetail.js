import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    useWindowDimensions,
    View,
} from 'react-native'
import {
    IconButton,
    ProductSelector,
    ThemedText,
} from '.'
import {
    useApp,
    useProducts,
    useUser,
    AppContext,
} from '@context'
import { getImageDims } from '@utils/images'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ image, deleteImage, setAvatar, setProductImage }) => {

    const { theme } = useApp()
    const dims = useWindowDimensions()
    const { profile } = useUser()
    const { items } = useProducts()

    const {
        isLandscape,
        loading,
    } = useContext(AppContext)

    const [imageDims, setImageDims] = useState(null)

    useEffect(() => {
        console.log('image', image)
    }, [])

    useEffect(() => {
        if (dims) {
            setImageDims(getImageDims(image.width, image.height, dims))
        }
    }, [dims])

    return (
        <View
            style={{
                flexDirection: isLandscape ? 'row' : 'column',
                justifyContent: isLandscape ? 'center' : 'flex-start',
                alignItems: 'flex-start',
                gap: 10,
                width: '100%',
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    flexBasis: 'auto',
                    flexGrow: 0,
                }}
            >
                {imageDims && (
                    <Image
                        source={{
                            uri: `${IMAGE_PATH}/${image.user.username}/${image.filename}`,
                        }}
                        style={{
                            resizeMode: 'contain',
                            height: imageDims ? imageDims.height : image.height,
                            width: imageDims ? imageDims.width : image.width,
                            marginHorizontal: 'auto',
                        }}
                    />
                )}
            </View>
            <View
                style={{
                    flexBasis: 'auto',
                    flexGrow: 0,
                    marginVertical: 20,
                }}
            >

                {(profile._id === image.user._id || profile.role === 'admin') ? (
                    <View
                        style={{
                            flexBasis: 'auto',
                            flexGrow: isLandscape ? 0 : 0,
                        }}
                    >
                        <View
                            style={{
                                flexBasis: 'auto',
                                display: 'flex',
                                flexDirection: isLandscape ? 'column' : 'row',
                                justifyContent: isLandscape ? 'flex-start' : 'stretch',
                                width: '100%',
                                paddingHorizontal: 'auto',
                                marginBottom: 10,
                            }}
                        >
                            
                            {(
                                (!profile.profileImage || profile.profileImage._id !== image._id)
                                && image.user._id === profile._id
                            ) ? (
                                <IconButton
                                    type='primary'
                                    label='Set as Avatar'
                                    onPress={setAvatar}
                                    disabled={loading}
                                    style={{
                                        color: theme?.colors.textDefault,
                                    }}
                                />
                            ) : null}

                            {(
                                profile.username !== 'Driver' &&
                                profile.username !== 'Customer' &&
                                profile.username !== 'Vendor' ||
                                profile.role === 'admin'
                            ) && (
                                <IconButton
                                    type='danger'
                                    label='Delete'
                                    onPress={deleteImage}
                                    disabled={loading || process.env.NODE_ENV === 'development'}
                                    style={{ flex: 1 }}
                                />
                            )}

                        </View>

                        {
                            (profile.role === 'vendor' && items.length)
                                ? (
                                    <View style={{
                                        flex: 1,
                                        width: '100%',
                                    }}>
                                        <ThemedText bold>
                                            Set as Product Image
                                        </ThemedText>

                                        <ProductSelector
                                            onSelect={setProductImage}
                                            products={items}
                                            imageId={image._id}
                                        />
                                    </View>
                                ) : null
                            }
                    </View>
                ) : null}
            </View>
        </View>
    )
}