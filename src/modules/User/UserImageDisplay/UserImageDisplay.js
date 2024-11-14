import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import {
    ActivityIndicator,
    // IconButton,
    ImageContainer,
    ImageControlPanel,
    // ModalHeader,
    // ThemedText,
} from '@components'
// import { useUser } from '@user'
// import { Caption } from '@modules'
import {
    // deleteImage,
    loadImage,
    // setAvatar,
} from '../utils'
import { useImages } from '@images'
// import { ImageControlPanel } from './components'

const UserImageDisplay = ({ data }) => {
    
    const {
        // closeImagesModal,
        // imagesLoading,
        // removeImage,
        setImagesLoading,
        // setImagesModal,
    } = useImages()

    // const {
    //     setProfileImage,
    //     user,
    //     userLoading,
    //     setUserLoading,
    // } = useUser()

    const [image, setImage] = useState(null)
    // const [isProfileImage, setIsProfileImage] = useState(null)

    const init = async id => {
        setImagesLoading(true)
        const image = await loadImage(id)
        setImagesLoading(false)
        if (image) setImage(image)
    }

    useEffect(() => {
        if (data) init(data._id)
    }, [])

    // useEffect(() => {
    //     setIsProfileImage(user.profileImage?._id === image?._id)
    // }, [image])
    
    // const handleDelete = async () => {

    //     if (process.env.NODE_ENV === 'development') return alert(`Can't delete in development`)

    //     setImagesLoading(true)
    //     const deletedImage = await deleteImage(image._id, isProfileImage)
    //     setImagesLoading(false)
        
    //     if (deletedImage) {
    //         removeImage(deletedImage._id)
    //         closeImagesModal()
    //     } else {
    //         console.log('Error deleting image.')   
    //     }
    // }

    // const makeAvatar = async () => {

    //     setUserLoading(true)
    //     const data = await setAvatar(user._id, image._id)
    //     setUserLoading(false)

    //     if (data && data.profileImage) {
    //         setProfileImage(data.profileImage)
    
    //         setIsProfileImage(true)
    //     }
    // }

    // const removeAvatar = async () => {

    //     setUserLoading(true)
    //     await setAvatar(user._id)
    //     setUserLoading(false)

    //     setProfileImage(null)

    //     setIsProfileImage(false)
    // }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
            }}
        >
            
            <View
                style={{
                    flexDirection: 'row',
                    gap: 10,
                }}
            >
                <View
                    style={{
                        flexGrow: 1,
                        flexShrink: 1,
                    }}
                >
                    {
                        image
                        ? <ImageContainer image={image} />
                        : <ActivityIndicator />
                    }

                </View>

            </View>
                
            {image && <ImageControlPanel image={image} />}
                {/* <View
                    style={{
                        flexGrow: 0,
                        flexShrink: 0,
                        gap: 10,
                    }}
                >

                    <IconButton
                        name={'image-sharp'}
                        color={isProfileImage ? 'red' : null}
                        onPress={isProfileImage ? removeAvatar : makeAvatar}
                        disabled={userLoading}
                        style={{ padding: 3 }}
                    />

                    <IconButton
                        name='trash-sharp'
                        onPress={handleDelete}
                        disabled={imagesLoading}
                        style={{ padding: 3 }}
                    />
                    
                </View>

            </View>

            <View style={{ paddingHorizontal: 10 }}>
                <Caption data={image} />
            </View> */}

            {/* </View> */}
                
            {/* {image && <ImageControlPanel image={image} />} */}
        </View>
    )
}

export default UserImageDisplay