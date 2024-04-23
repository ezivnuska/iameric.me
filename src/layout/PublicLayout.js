import React from 'react'
import {
  View,
} from 'react-native'
import {
  IconButton,
  AuthModal,
} from '@components'
import {
  useAuth,
} from '@context'

const SignInButton = () => {

    const { authLoading, authModal, setAuthModal } = useAuth()
    
    return (
        <IconButton
            iconName='log-in-outline'
            label='Sign In'
            onPress={() => setAuthModal('SIGNIN')}
            disabled={authLoading}
            alignIcon='right'
            transparent
        />
    )
}

export default () => (
  <View>
    <SignInButton />
    <AuthModal />
  </View>
)