import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Screen } from './components'
import { ActivityIndicator, ImageList } from '@components'
import User, { UserModal, useUser } from '@user'

const UserScreen = props => {

    const {
        images,
        imagesLoaded,
        imagesLoading,
        uploading,
        user,
        userModal,
        closeUserModal,
        initImages,
        setUserModal,
    } = useUser()

    useEffect(() => {
        if (!imagesLoaded) initImages(user._id)
    }, [])

    const renderContent = route => {
        switch (route.name)  {
            case 'Profile':
                return <User {...props} />
                break
            case 'Images':
                return (
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
                )
                break
            default:
        }
    }
    
    return (
        <Screen {...props} secure>
            
            {renderContent(props.route)}

            <UserModal
                modal={userModal}
                onClose={closeUserModal}
            />

        </Screen>
    )
}

export default UserScreen