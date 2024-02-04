import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    Text,
} from 'react-native'
import {
    IconButton,
    LoadingView,
    Screen,
} from '@components'
import { AppContext } from '../AppContext'
import { loadUserById } from '../utils/data'
import classes from '../styles/classes'
import { useTheme } from 'react-native-paper'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ navigation, route }) => {

    const theme = useTheme()

    const {
        dispatch,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(null)
    const [userDetails, setUserDetails] = useState(null)

    useEffect(() => {

        if (!route.params || !route.params.id)
            console.log('missing required id param')
        else loadUserDetails()

    }, [])

    const loadUserDetails = async id => {
        setLoading('Loading driver details...')
        const user = await loadUserById(id)
        setLoading(null)
        setUserDetails(user)
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
        
        return (
            <Image
                source={source}
                style={{
                    width: profileImage ? profileImage.width : 250,
                    height: profileImage ? profileImage.width : 250,
                    resizeMode: 'cover',
                    marginVertical: 15,
                }}
            />
        )
    }

    return (
        <Screen navigation={navigation}>
            
            {loading
                ? <LoadingView label={loading} />
                : userDetails
                    ? (
                        <>
                            <IconButton
                                iconName='arrow-back-outline'
                                onPress={() => navigation.navigate('DriverList')}
                                label='Back'
                                align='left'
                                transparent
                            />
                            
                            <Text
                                style={[
                                    classes.headerSecondary,
                                    { color: theme?.colors.textDefault },
                                ]}
                            >
                                {userDetails.username}
                            </Text>

                            {renderUserAvatar()}
                        </>
                    )
                    : null
            }
            
        </Screen>
    )
}