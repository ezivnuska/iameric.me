import React, { useEffect, useState } from 'react'
import {
    Image,
    useWindowDimensions,
    View,
} from 'react-native'
import {
    IconButton,
    ThemedText,
} from '@components'
import { useApp } from '@context'
import { loadUserById } from '@utils/contacts'
import {
    getProfileImagePathFromUser,
    getMaxAvailableImageSize,
} from '@utils/images'
import classes from '@styles/classes'
import { navigationRef } from 'src/navigation/RootNavigation'

export default ({ userId }) => {

    const { landscape } = useApp()

    const dims = useWindowDimensions()

    const [userDetails, setUserDetails] = useState(null)
    const [imageSize, setImageSize] = useState(null)

    useEffect(() => {
        const loadUserDetails = async () => {
            const user = await loadUserById(userId)
            
            if (!user) {
                console.log('could not load user details with id:', userId)
            } else {
                setUserDetails(user)
            }
        }
        loadUserDetails(userId)
    }, [])

    useEffect(() => {
        if (userDetails) {
            if (userDetails._id !== userId) {
                if (userDetails.profileImage) {
                    getImageDims()
                }
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

    return (
        <View
            style={{
                width: '100%',
            }}
        >
            {userDetails
                ? landscape
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