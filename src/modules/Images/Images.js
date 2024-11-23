import React from 'react'
import { View } from 'react-native'
import {
    // ImagesModal,
    useImages,
} from '.'
import { ImageList, UserHeader } from '@components'
import { useUser } from '@user'

const Images = props => {

    const {
        user,
        userModal,
        // closeUserModal,
        setUserModal,
    } = useUser()

    const {
        images,
        // imagesModal,
        uploading,
    } = useImages()
    
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <UserHeader user={user} route={props.route} />
            
            <ImageList
                images={images}
                onPress={(type, data) => setUserModal(type, data)}
                uploading={uploading}
                upload={() => setUserModal('IMAGE_UPLOAD')}
            />
    
            {/* <ImagesModal
                modal={imagesModal}
                onCancel={closeUserModal}
            /> */}
        </View>
    )
}

export default Images