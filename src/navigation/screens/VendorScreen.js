import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
} from 'react-native'
import {
    IconButton,
    LoadingView,
    Menu,
} from '@components'
import {
    Screen,
} from '.'
import { AppContext } from '../../AppContext'
import { loadUserById } from '@utils/data'
import { useTheme } from 'react-native-paper'
import axios from 'axios'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ navigation, route }) => {

    const theme = useTheme()

    const {
        dispatch,
        loading,
    } = useContext(AppContext)

    const [products, setProducts] = useState(null)
    const [userDetails, setUserDetails] = useState(null)

    const { id } = route.params

    const getProducts = async () => {
        
        dispatch({ type: 'SET_LOADING', loading: 'Loading menu...' })
        
        const { data } = await axios.get(`/api/products/${id}`)
        
        if (!data) {
            console.log('could not get vendor products')
        } else if (!data.products || !data.products.length) {
            console.log('No products found')
            setProducts([])
        } else {
            setProducts(data.products)
        }
        
        dispatch({ type: 'SET_LOADING', loading: null })
    }

    useEffect(() => {
        if (!id) console.log('missing required id param')
        else if (!userDetails || (userDetails && userDetails._id !== id)) {
            loadUserDetails(id)
        }
    }, [])

    useEffect(() => {
        if (userDetails && !products) getProducts()
    }, [userDetails])
    
    const loadUserDetails = async id => {

        dispatch({ type: 'SET_LOADING', loading: 'Loading vendor details...' })
        
        const user = await loadUserById(id)

        if (!user) {
            console.log('Error loading user details.')
        } else {
            setUserDetails(user)
        }
        
        dispatch({ type: 'SET_LOADING', loading: null })
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
                    width: profileImage ? profileImage.width : 300,
                    height: profileImage ? profileImage.width : 300,
                    resizeMode: 'cover',
                    marginVertical: 15,
                }}
            />
        )
    }

    return (
        <Screen title='Vendors'>
            
            {loading
                ? <LoadingView label={loading} />
                : userDetails
                    ? (
                        <>
                            <IconButton
                                iconName='arrow-back-outline'
                                onPress={() => navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'VendorList' }],
                                })}
                                label='Back'
                                align='left'
                                textStyles={{ color: theme?.colors.textDefault }}
                                transparent
                            />

                            {renderUserAvatar()}

                            {products && (
                                <Menu
                                    loading={loading}
                                    products={products}
                                    vendor={userDetails}
                                />
                            )}
                        </>
                    )
                    : null
            }
            
        </Screen>
    )
}