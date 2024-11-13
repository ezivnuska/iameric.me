import React from'react'
import { View } from'react-native'
import {
    Cabinet,
    Form,
    SimpleButton,
} from '@components'
import { useUser } from '@user'
import { useModal } from '@modal'
import { navigate } from '@utils/navigation'
import { destroy } from './utils'

const Settings = () => {
    
    const { user } = useUser()
    const { closeModal } = useModal()
    
    const handleSignout = () => {
        closeModal()
        navigate('Home', { signout: true })
    }

    const handleDestroy = async () => {
        const { id } = await destroy(user._id)
        if (id) {
            console.log('destroyed id', id)

            // notifySocket('user_signed_out')
            closeModal()
        }
    }

    return (
        <View style={{ flex: 1 }}>

            <View
                style={{
                    flexGrow: 1,
                    gap: 10,
                }}
            >

                <SimpleButton
                    label={'Sign Out'}
                    onPress={() => handleSignout()}
                />

                <Cabinet
                    title='Close Account'
                    closed
                >
                    <Form
                        fields={[
                            {
                                label: 'Enter Username',
                                name: 'destroy',
                                placeholder: 'username',
                                multiline: false,
                            },
                        ]}
                        title='Delete Account'
                        // onCancel={closeModal}
                        onSubmit={handleDestroy}
                    />
                    {/* <DestroyForm /> */}
                </Cabinet>

            </View>
            
        </View>
    )
}

export default Settings