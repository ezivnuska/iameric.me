import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Screen } from './components'
import { ActivityIndicator, Images, ImageList } from '@components'
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
        // clearUserModals,
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
                return imagesLoading
                    ? <ActivityIndicator label='Loading Images...' size='medium' />
                    : imagesLoaded && (
                        <View
                            style={{
                                flex: 1,
                                marginHorizontal: 10,
                            }}
                        >
                            <ImageList
                                images={images}
                                onPress={(type, data) => setUserModal(type, data)}
                                uploading={uploading}
                                upload={() => setUserModal('IMAGE_UPLOAD')}
                                list={route.params?.list}
                            />
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