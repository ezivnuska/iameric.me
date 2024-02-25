import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    View,
} from 'react-native'
import {
    IconButton,
    ImageList,
    LoadingView,
    ThemedText,
} from '@components'
import { AppContext } from '../AppContext'
import { loadUserById } from '@utils/data'
import { useTheme } from 'react-native-paper'
import classes from '@styles/classes'
import { navigationRef } from 'src/navigation/RootNavigation'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ userId, clear }) => {

    const theme = useTheme()

    const {
        dispatch,
        loading,
    } = useContext(AppContext)

    const [userDetails, setUserDetails] = useState(null)
    // const [images, setImages] = useState(null)

    useEffect(() => {
        if (!userId) console.log('missing required user id param')
        else loadUserDetails(userId)
    }, [])

    useEffect(() => {
        if (userId && userDetails && userId !== userDetails._id)
            loadUserDetails(userId)
    }, [userId])

    useEffect(() => {
        if (!userDetails) {
            // setImages(null)
        } else {
            if (userDetails._id !== userId) {
                loadUserDetails(userId)
            // } else if (!images) {
            //     loadImages()
            }
        }
    }, [userDetails])

    const loadUserDetails = async () => {

        dispatch({ type: 'SET_LOADING', loading: 'Loading user...' })
        
        const user = await loadUserById(userId)
        
        if (!user) {
            console.log('could not load user details with id:', userId)
        } else {
            setUserDetails(user)
        }
        
        dispatch({ type: 'SET_LOADING', loading: null })
    }

    // const loadImages = async () => {
        
    //     dispatch({ type: 'SET_LOADING', loading: 'Fetching images...' })
        
    //     const { data } = await axios.get(`/api/user/images/${userId}`)
        
    //     if (!data) {
    //         console.log('Error fetching user images.')
    //     } else if (!data.images || !data.images.length) {
    //         console.log('no images found.')
    //         setImages([])
    //     } else {
    //         setImages(data.images)
    //     }
        
    //     dispatch({ type: 'SET_LOADING', loading: null })
    // }

    const getImageDims = (w, h) => {
        let scale = 1
        let width = w
        let height = h
        if (w >= h) {// if landscape
            if (w > 200) {
                scale = 200 / width
                width *= scale
                height *= scale
            }
        } else {// if portrait
            if (h > 200) {
                scale = 200 / height
                width *= scale
                height *= scale
            }
        }
        return {
            width,
            height,
        }
    }

    // TODO: clean this.
    const renderUserAvatar = () => {

        const { profileImage, username } = userDetails

        const filename = (profileImage && profileImage.filename)
            ? profileImage.filename
            : null
        
        const source = filename ?
            `${IMAGE_PATH}/${username}/${filename}` :
            `${IMAGE_PATH}/avatar-default.png`

        const { width, height } = profileImage
            ? getImageDims(profileImage.width, profileImage.height)
            : { width: 200, height: 200 }
        
        return (
            <Image
                source={source}
                style={{
                    width,
                    height,
                    resizeMode: 'cover',
                    // marginVertical: 15,
                }}
            />
        )
    }

    return (
        <View
            style={{
                marginHorizontal: 'auto',
            }}
        >
            {loading
                ? <LoadingView label={loading} />
                : userDetails
                    ? (
                        <View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    height: 40,
                                }}
                            >
                                <ThemedText style={[classes.headerSecondary, { paddingHorizontal: 7 }]}>
                                    {userDetails.username}
                                </ThemedText>
                                
                                <IconButton
                                    iconName='close-outline'
                                    onPress={clear}
                                    transparent
                                />

                            </View>
                            
                            {renderUserAvatar()}
                            
                            <IconButton
                                label='View Profile'
                                onPress={() => {
                                    navigationRef.navigate('Users', { screen: 'User', params: { id: userDetails._id} })
                                    clear()
                                }}
                                style={{
                                    marginTop: 10,
                                }}
                                textStyles={{ color: theme?.colors.buttonPrimaryLabel }}
                            />

                            {/* <ImageList
                                images={images}
                                username={userDetails.username}
                                onSelected={image => dispatch({ type: 'SET_IMAGE', image })}
                            /> */}
                            {/* <UserImageModule user={userDetails} /> */}
                        </View>
                    )
                    : null
            }
        </View>
    )
}