import React, { useEffect, useState } from 'react'
import {
    Image,
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
} from '@context'
import { getImageDims } from '@utils/images'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ image, deleteImage, setAvatar, setProductImage }) => {

    const { dims, landscape, theme } = useApp()
    const { profile, userLoading } = useUser()
    const { products } = useProducts()

    const [imageDims, setImageDims] = useState(null)

    useEffect(() => {
        setImageDims(getImageDims(image.width, image.height, dims))
    }, [dims])

    const deleteRestricted = () => userLoading || process.env.NODE_ENV === 'development'

    const handleDelete = () => {
        if (deleteRestricted()) alert(`Can't delete in development`)
        else deleteImage()
    }

    return (
        <View
            style={{
                flexDirection: landscape ? 'row' : 'column',
                justifyContent: landscape ? 'center' : 'flex-start',
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
                            flexGrow: landscape ? 0 : 0,
                        }}
                    >
                        <View
                            style={{
                                flexBasis: 'auto',
                                display: 'flex',
                                flexDirection: landscape ? 'column' : 'row',
                                justifyContent: landscape ? 'flex-start' : 'stretch',
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
                                    disabled={userLoading}
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
                                    onPress={handleDelete}
                                    // disabled={deleteRestricted()}
                                    style={{ flex: 1, opacity: deleteRestricted() ? 0.5 : 1 }}
                                />
                            )}

                        </View>

                        {
                            (profile.role === 'vendor' && products.length)
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
                                            products={products}
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