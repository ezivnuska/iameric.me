import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    useWindowDimensions,
    View,
} from 'react-native'
import {
    IconButton,
    LoadingView,
    ThemedText,
} from '@components'
import { AppContext } from '../AppContext'
import { loadUserById } from '@utils/data'
import {
    getProfileImagePathFromUser,
    getMaxAvailableImageSize,
} from '@utils/images'
import classes from '@styles/classes'
import { navigationRef } from 'src/navigation/RootNavigation'

export default ({ userId }) => {

    const {
        dispatch,
        isLandscape,
        loading,
    } = useContext(AppContext)

    const dims = useWindowDimensions()

    const [userDetails, setUserDetails] = useState(null)
    const [imageSize, setImageSize] = useState(null)

    useEffect(() => {
        if (!userId) console.log('missing required user id param')
        else loadUserDetails(userId)
    }, [])

    useEffect(() => {
        if (userId && userDetails && userId !== userDetails._id)
            loadUserDetails(userId)
    }, [userId])

    useEffect(() => {
        if (userDetails) {
            if (userDetails._id !== userId) {
                loadUserDetails(userId)
            }
            if (userDetails.profileImage) {
                getImageDims()
            }
        }
    }, [userDetails])

    useEffect(() => {
        if (userDetails && userDetails.profileImage) getImageDims()
    }, [dims])

    const getImageDims = () => {
        const { width, height } = userDetails.profileImage
        const imageDims = getMaxAvailableImageSize(dims, width, height)
        setImageSize(imageDims)
    }

    const loadUserDetails = async () => {

        dispatch({ type: 'SET_LOADING', loading: 'Loading user short...' })
        
        const user = await loadUserById(userId)
        
        if (!user) {
            console.log('could not load user details with id:', userId)
        } else {
            setUserDetails(user)
        }
        
        dispatch({ type: 'SET_LOADING', loading: null })
    }

    if (loading) return <LoadingView />
    return (
        <View
            style={{
                width: '100%',
                // borderWidth: 1,
                // borderColor: 'red',
            }}
        >
            {userDetails
                ? isLandscape
                    ? <LayoutHorizontal imageSize={imageSize} userDetails={userDetails} />
                    : <LayoutVertical imageSize={imageSize} userDetails={userDetails} />
                : null}
        </View>
    )
}

const LayoutVertical = ({ imageSize, userDetails }) => (
    <View>
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <ThemedText
                style={classes.headerSecondary}
            >
                {userDetails.username}
            </ThemedText>

        </View>
        
        <Image
            source={getProfileImagePathFromUser(userDetails)}
            style={imageSize}
        />
        
        <IconButton
            label='View Profile'
            onPress={() => {
                navigationRef.navigate('Users', { screen: 'User', params: { id: userDetails._id} })
                clear()
            }}
            style={{
                marginTop: 10,
            }}
        />
    </View>
)

const LayoutHorizontal = ({ imageSize, userDetails }) => (
    <View
        style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 15,
        }}
    >
        <Image
            source={getProfileImagePathFromUser(userDetails)}
            style={imageSize}
        />
        
        <View>

            <ThemedText
                style={classes.headerSecondary}
            >
                {userDetails.username}
            </ThemedText>
            
            <IconButton
                label='View Profile'
                onPress={() => {
                    navigationRef.navigate('Users', { screen: 'User', params: { id: userDetails._id} })
                    clear()
                }}
                style={{
                    marginTop: 10,
                }}
            />
        </View>
        
    </View>
)