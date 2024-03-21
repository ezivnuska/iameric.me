import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
} from 'react-native'
import {
    IconButton,
    LoadingView,
    Menu,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'
import { AppContext } from '../../AppContext'
import { loadUserProducts } from '@utils/data'
import { useTheme } from 'react-native-paper'
import { loadUser, loadUsers } from '@utils/data'

export default ({ navigation, route }) => {
    
    const { id } = route.params

    const theme = useTheme()

    const {
        dispatch,
        loading,
    } = useContext(AppContext)

    const [currentUser, setCurrentUser] = useState(null)
    
    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const user = await loadUser(dispatch, id)
        if (!user) console.log('no user could be loaded')
        else setCurrentUser(user)
    }

    useEffect(() => {
        if (currentUser) {
            if (!currentUser.products) {
                initProducts()
            }
        }
    }, [currentUser])

    const initProducts = async () => {
        const loadedProducts = await loadUserProducts(dispatch, currentUser._id)
        if (loadedProducts) {
            setCurrentUser({
                ...currentUser,
                products: loadedProducts,
            })
        } else {
            console.log('could not load user products')
        }
    }

    if (loading) return <LoadingView />

    return (
        <Screen
            titleComponent={
                <ScreenTitle
                    title={currentUser?.username || 'Restaurant'}
                >
                    <IconButton
                        label='Return to Vendors'
                        onPress={() => navigation.reset({
                            index: 0,
                            routes: [{ name: 'VendorList' }],
                        })}
                        disabled={loading}
                        textStyles={{
                            fontSize: 16,
                            fontWeight: 400,
                            color: theme?.colors.textDefault,
                        }}
                        outline
                        transparent
                    />
                </ScreenTitle>
            }
        >
            {currentUser ? (
                <Menu
                    loading={loading}
                    vendor={currentUser}
                />
            ) : null}
        </Screen>
    )
}