import React, { useContext } from 'react'
import {
    View,
} from 'react-native'
import {
    ImageModule,
    CenteredView,
    LocationModule,
    SecureScreen,
    SignoutModule,
} from '@components'
import { AppContext } from '../AppContext'
import { UserDetails } from 'src/components'

export default () => {

    const {
        user,
    } = useContext(AppContext)

    return user ? (
        <SecureScreen>

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                }}
            >
                <View
                    style={{
                        flexGrow: 1,
                    }}
                >
                    <UserDetails user={user} />

                    {user.role !== 'driver' && <LocationModule userId={user._id} />}

                    <ImageModule />    
                </View>
                
                <View
                    style={{
                        flexBasis: 'auto',
                        flexGrow: 0,
                    }}
                >
                    <SignoutModule />
                </View>
            </View>

        </SecureScreen>
    ) : null
}