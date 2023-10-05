import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    AvatarModule,
    ImageDetail,
    ImageList,
    ImageUploader,
    ModalContainer,
} from '.'
import {
    PlusCircleOutlined,
} from '@ant-design/icons'
import main from '../styles/main'
import layout from '../styles/layout'
import { AppContext } from '../AppContext'
import axios from 'axios'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const AvatarDisplay = () => {

    const {
        dispatch,
        user,
    } = useContext(AppContext)

    const [modalVisible, setModalVisible] = useState(false)

    const [featured, setFeatured] = useState(null)
    const [images, setImages] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getImages()
    }, [])

    useEffect(() => {
        if (user) getImages()
    }, [user])

    useEffect(() => {
        setImages(user.images)
    }, [user.images])

    const getImages = async () => {
        
        setLoading(true)
        
        const { data } = await axios
            .get(`/api/user/images/${user._id}`)
        
        if (!data) return console.log('could not load user images')
        console.log('images', data.images)
        setImages(data.images)
        
        setLoading(false)
    }

    const onUpload = (images, profileImage) => {

        dispatch({ type: 'SET_USER_IMAGES', images })
        setImages(images)
        if (profileImage) dispatch({ type: 'SET_PROFILE_IMAGE', profileImage })

        setModalVisible(false)
    }

    const removeImage = id => {
        const imageArray = images.filter(image => image._id !== id)
        setImages(imageArray)
        setFeatured(false)
    }

    const updateAvatar = avatar => {
        dispatch({ type: 'SET_PROFILE_IMAGE', profileImage: avatar })
        setFeatured(false)
    }
    
    return (
        <View style={styles.container}>
                
            <View style={styles.displayHeader}>
                
                <Text style={main.heading}>Images &amp; Avatar</Text>
                
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <PlusCircleOutlined
                            style={{ fontSize: 22 }}
                        />
                    </TouchableOpacity>
                </View>

            </View>

            {(images && images.length) ? (
                <ImageList
                    images={images}
                    loading={loading}
                    path={`${IMAGE_PATH}/${user.username}`}
                    setFeatured={setFeatured}
                />
            ) : null}
            
            <ModalContainer
                animationType='slide'
                transparent={false}
                visible={modalVisible}
                closeModal={() => setModalVisible(false)}
                label='Avatar Modal'
            >
                {/* <AvatarModule onComplete={() => setModalVisible(false)} /> */}
                <ImageUploader user={user} onUpload={onUpload} />
            </ModalContainer>

            <ModalContainer
                animationType='slide'
                transparent={false}
                visible={featured}
                closeModal={() => setFeatured(null)}
                label='Image Details'
            >
                <ImageDetail
                    image={featured}
                    onImageDeleted={id => removeImage(id)}
                    onAvatarSet={avatar => updateAvatar(avatar)}
                />
            </ModalContainer>
        </View>
    )
}

export default AvatarDisplay

const styles = StyleSheet.create({
    container: {
        marginVertical: layout.verticalMargin,
		minWidth: 350,
        maxWidth: 375,
        width: 375,
    },
    displayHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 15,
    },
    title: {
        flex: 1,
        flexBasis: 'auto',
        flexGrow: 0,
        flexShrink: 0,
        fontSize: 24,
    },
    buttons: {
        flex: 1,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
    },
    headerButton: {
        marginVertical: 4,
        marginHorizontal: 7,
    },
})