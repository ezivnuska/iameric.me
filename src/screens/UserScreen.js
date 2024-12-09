import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Images, ImageList, Screen, User } from '@components'
import { useModal, useUser } from '@context'

const UserScreen = props => {

    const {
        images,
        imagesLoaded,
        imagesLoading,
        uploading,
        user,
        // userModal,
        // closeUserModal,
        // clearUserModals,
        initImages,
        // setUserModal,
    } = useUser()

    const {
        // closeModal,
        setModal,
    } = useModal()

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
                                onPress={(type, data) => setModal(type, data)}
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

        </Screen>
    )
}

export default UserScreen