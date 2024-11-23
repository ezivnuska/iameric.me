import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, ImageList, UserHeader } from '@components'
import { useUser } from '@user'

const Images = props => {

    const {
        images,
        imagesLoaded,
        imagesLoading,
        initImages,
        uploading,
        user,
        setUserModal,
    } = useUser()

    useEffect(() => {
        if (!imagesLoaded && !imagesLoading) initImages(user._id)
    }, [])
    
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <UserHeader user={user} route={props.route} />
            
            <View
                style={{
                    flex: 1,
                    marginHorizontal: 10,
                }}
            >
                {imagesLoaded ? (
                    <ImageList
                        images={images}
                        onPress={(type, data) => setUserModal(type, data)}
                        uploading={uploading}
                        upload={() => setUserModal('IMAGE_UPLOAD')}
                    />
                ) : <ActivityIndicator size='medium' label='Loading Images...' />}
            </View>
        </View>
    )
}

export default Images