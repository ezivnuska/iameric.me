import React, { useContext, useEffect, useState } from 'react'
import {
    IconButton,
    Menu,
} from '@components'
import {
    Screen,
    ScreenTitle,
} from '.'
import { AppContext, useApp, useProducts } from '@context'
import { loadUser, loadUserProducts } from '@utils/data'

export default ({ navigation, route }) => {
    
    const { id } = route.params

    const { theme } = useApp()
    const { setProducts } = useProducts()

    const {
        loading,
    } = useContext(AppContext)

    const [currentUser, setCurrentUser] = useState(null)
    
    useEffect(() => {
        const init = async () => {
            const user = await loadUser(id)
            if (!user) console.log('no user could be loaded')
            else setCurrentUser(user)
        }
        init()
    }, [])

    useEffect(() => {
        if (currentUser) {
            if (!currentUser.products) {
                initProducts()
            }
        }
    }, [currentUser])

    const initProducts = async () => {
        const loadedProducts = await loadUserProducts(currentUser._id)
        if (loadedProducts) {
            setProducts(loadedProducts)
            setCurrentUser({
                ...currentUser,
                products: loadedProducts,
            })
        } else {
            console.log('could not load user products')
        }
    }

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