import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    View,
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
import { loadUserById } from '@utils/data'
import { useTheme } from 'react-native-paper'
import axios from 'axios'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'
const MAX_IMAGE_WIDTH = 200
const MAX_IMAGE_HEIGHT = 150

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

    const getImageDims = (w, h) => {
        let scale = 1
        let width = w
        let height = h
        if (w >= h) {// if landscape
            if (w > MAX_IMAGE_WIDTH) {
                scale = MAX_IMAGE_WIDTH / width
                width *= scale
                height *= scale
            }
        } else {// if portrait
            if (h > MAX_IMAGE_HEIGHT) {
                scale = MAX_IMAGE_HEIGHT / height
                width *= scale
                height *= scale
            }
        }
        return { width, height }
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

        const { width, height } = getImageDims(profileImage.width, profileImage.height)
        
        return (
            <Image
                source={source}
                style={{
                    width,
                    height,
                    resizeMode: 'cover',
                    marginBottom: 10,
                }}
            />
        )
    }

    return (
        <Screen>
            <ScreenTitle
                title={userDetails?.username || 'Vendor'}
            >
                <IconButton
                    onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: 'VendorList' }],
                    })}
                    label='Return to Vendors'
                    textStyles={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: theme?.colors.textDefault,
                    }}
                    transparent
                />
            </ScreenTitle>
            
            {loading
                ? <LoadingView label={loading} />
                : userDetails
                    ? (
                        <View>
                            <View
                                style={{ paddingHorizontal: 10 }}
                            >
                                {renderUserAvatar()}
                            </View>

                            <Menu
                                loading={loading}
                                products={products}
                                vendor={userDetails}
                            />
                        </View>
                    )
                    : null
            }
            
        </Screen>
    )
}