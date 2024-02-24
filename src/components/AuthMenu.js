import React, { useContext } from 'react'
import {
    Image,
    Pressable,
    Text,
    View,
} from 'react-native'
import {
    CartButton,
    IconButton,
    ThemedText,
} from '.'
import { AppContext } from '../AppContext'
import { useTheme } from 'react-native-paper'
import { navigationRef } from '../navigation/RootNavigation'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const UserButton = ({ user }) => {

    const theme = useTheme()
    
    const getSource = () => user.profileImage
        ? `${IMAGE_PATH}/${user.username}/${user.profileImage.filename}`
        : `${IMAGE_PATH}/avatar-default-small.png`
    
    return (
        <Pressable
            onPress={() => navigationRef.navigate('Settings')}
            style={{
                flex: 1,
                flexGrow: 0,
                flexShrink: 0,
                flexBasis: 'auto',
                paddingHorizontal: 7,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: theme?.colors.screen,
                shadowColor: theme?.colors.shadow,
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: 0.5,
                shadowRadius: 4,
                elevation: 1,
                height: 30,
                borderWidth: 1,
                borderColor: '#fff',
                borderStyle: 'dotted',
            }}
        >
            <View
                style={{
                    width: 28,
                    height: 28,
                    marginRight: 5,
                    borderRadius: 14,
                    overflow: 'hidden',
                }}
            >
                <Image
                    source={getSource()}
                    style={{
                        width: 28,
                        height: 28,
                        resizeMode: 'center',
                    }}
                    // onLoadStart={() => setLoading(true)}
                    // onLoadEnd={() => setLoading(false)}
                />
            </View>
    
            <ThemedText
                style={{
                    fontWeight: 700,
                    lineHeight: 30,
                }}
            >
                {user.username}
            </ThemedText>
            
        </Pressable>
    )
}

export default ({ user }) => {

    const theme = useTheme()
    
    const {
        cart,
        dispatch,
        loading,
    } = useContext(AppContext)

    return user ? (
        <View style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // height: '100%',
            borderWidth: 1,
            borderStyle: 'dotted',
            borderColor: 'green',
        }}>
            {cart?.length && <CartButton />}

            <UserButton user={user} />

            <IconButton
                onPress={() => dispatch({ type: 'SET_MODAL', modalName: 'SIGNOUT' })}
                disabled={loading}
                iconName='close-outline'
                textStyles={{ color: theme?.colors.textDefault }}
                transparent
            />
        </View>
    ) : (
        <IconButton
            iconName='log-in-outline'
            label='Sign In'
            onPress={() => dispatch({ type: 'SET_MODAL', modalName: 'SIGNIN' })}
            disabled={loading}
            alignIcon='right'
            transparent
        />
    )
}