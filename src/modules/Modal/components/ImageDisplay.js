import React, { useMemo } from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    SimpleButton,
    ThemedText,
} from '@components'
import { useApp } from '@app'
import { useImages } from '@images'
import { useModal } from '@modal'
import {
    deleteImage,
    getMaxImageDims,
    setImageAsAvatar,
} from '@utils/images'
import Icon from 'react-native-vector-icons/Ionicons'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ImageDisplay = ({ image }) => {
    const {
        dims,
        setProfileImage,
        theme,
        user,
    } = useApp()

    const {
        imagesLoading,
        removeImage,
        setImagesLoading,
    } = useImages()

    const { closeModal } = useModal()

    // const [imageDims, setImageDims] = useState(null)

    const imageDims = useMemo(() => getMaxImageDims(image.width, image.height, dims.width, dims.height - 100), [image])

    // useEffect(() => {
    //     // const imageSize = getMaxImageDims(image.width, image.height, dims)
    //     setImageDims(imageSize)
    // }, [])

    const handleDelete = async () => {
        setImagesLoading(true)
        const deletedImage = await deleteImage(image._id)
        setImagesLoading(false)

        if (deletedImage) {
            removeImage(deletedImage._id)
            closeModal()
        } else {
            console.log('could not delete image')
        }
    }

    const makeAvatar = async () => {

        setImagesLoading(true)
        const avatar = await setImageAsAvatar(image._id, user._id)
        setImagesLoading(false)
        
        if (avatar) setProfileImage(avatar)

        closeModal()
    }

    return (
        <View
            style={{
                gap: 10,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <ThemedText>Image Preview</ThemedText>

                <Pressable
                    onPress={() => closeModal()}
                    style={{ flexGrow: 0 }}
                >
                    <Icon
                        name='close-outline'
                        size={24}
                        color={theme?.colors.textDefault}
                    />
                </Pressable>
            </View>

            <Image
                source={{
                    uri: `${IMAGE_PATH}/${image.user.username}/${image.filename}`,
                }}
                style={{
                    resizeMode: 'contain',
                    width: imageDims.width,
                    height: imageDims.height,
                    marginHorizontal: 'auto',
                }}
            />
            
            <SimpleButton
                label='Delete'
                onPress={handleDelete}
                disabled={imagesLoading}
            />

            <SimpleButton
                label='Make Avatar'
                onPress={makeAvatar}
                disabled={imagesLoading}
            />

        </View>
    )
}