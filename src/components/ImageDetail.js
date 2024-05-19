import React, { useEffect, useMemo, useState } from 'react'
import {
    Image,
    View,
} from 'react-native'
import {
    IconButton,
    ImageSized,
    ProductSelector,
    ThemedText,
} from '@components'
import {
    useApp,
    useProducts,
    useUser,
} from '@context'
import { getMaxImageDims } from '@utils/images'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ image, deleteImage, setAvatar, setProductImage }) => {

    const { dims, landscape, theme } = useApp()
    const { profile, userLoading } = useUser()
    const { products } = useProducts()

    const [imageDims, setImageDims] = useState(null)

    const allowDeletion = () => (
        profile.username !== 'Driver' &&
        profile.username !== 'Customer' &&
        profile.username !== 'Vendor' &&
        profile.role === 'admin'
    )
    // const disableDelete = useMemo(() => userLoading || process.env.NODE_ENV === 'development', [userLoading])
    // const isAvatar = useMemo(() => (profile && (!profile.profileImage || profile.profileImage._id !== image._id)), [image, profile])
    // const owner = useMemo(() => profile && profile._id === image.user._id, [image, profile])

    const disableDelete = () => userLoading || process.env.NODE_ENV === 'development'
    const isAvatar = () => (profile.profileImage && profile.profileImage._id === image._id)
    const isOwner = () => profile._id === image.user._id
    // useEffect(() => {
    //     console.log('IMAGE_DETAIL', image)
    // }, [image])

    useEffect(() => {
        setImageDims(getMaxImageDims(image.width, image.height, dims))
    }, [dims])


    const handleDelete = () => {
        if (disableDelete()) alert(`Can't delete in development`)
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
                {imageDims && <ImageSized image={image} dims={imageDims} />}
            </View>
            <View
                style={{
                    flexBasis: 'auto',
                    flexGrow: 0,
                    marginVertical: 20,
                }}
            >

                {isOwner() && (
                    <View
                        style={{
                            flexBasis: 'auto',
                            flexGrow: landscape ? 0 : 0,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: landscape ? 'column' : 'row',
                                justifyContent: landscape ? 'stretch' : 'space-evenly',
                                width: '100%',
                                gap: 10,
                                // paddingHorizontal: 'auto',
                                // marginBottom: 10,
                            }}
                        >
                            
                            {(isOwner() && !isAvatar()) && (
                                <IconButton
                                    type='primary'
                                    label='Set as Avatar'
                                    onPress={setAvatar}
                                    disabled={userLoading}
                                    style={{
                                        color: theme?.colors.textDefault,
                                    }}
                                />
                            )}

                            {allowDeletion() && (
                                <IconButton
                                    type='danger'
                                    label='Delete'
                                    onPress={handleDelete}
                                    // disabled={disableDelete()}
                                    style={{
                                        flex: 1,
                                        opacity: disableDelete() ? 0.5 : 1,
                                    }}
                                />
                            )}

                        </View>

                        {(isOwner() && products.length) && (
                            <View
                                style={{
                                    flex: 1,
                                    width: '100%',
                                }}
                            >
                                <ThemedText bold>
                                    Set as Product Image
                                </ThemedText>

                                <ProductSelector
                                    onSelect={productId => setProductImage(image._id, productId)}
                                    products={products}
                                    imageId={image._id}
                                />
                            </View>
                        )}
                    </View>
                )}
            </View>
        </View>
    )
}