import React, { useContext, useEffect, useState } from 'react'
import {
    Pressable,
    Text,
    View,
} from 'react-native'
import {
    LoadingView,
    LocationForm,
    LocationDetails,
    PopUpModal,
} from '.'
import {
    EditOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons'
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import layout from '../styles/layout'
import { AppContext } from '../AppContext'
import { getLocationWithUserId } from '../utils/data'
import classes from '../styles/classes'

const initialState = {
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
}

export default ({ userId }) => {

    const {
        dispatch,
    } = useContext(AppContext)

    const [location, setLocation] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getLocationData(userId)
    }, [])

    const getLocationData = async userId => {

        setLoading(true)

        const locationData = await getLocationWithUserId(userId)
        
        setLoading(false)

        if (!locationData) {
            console.log('could not get location data.')
            return
        }

        setLocation(locationData)
    }

    const onSubmitAddress = async newLocation => {
        setLoading(true)

        const { data } = await axios
            .post('/api/location', newLocation)
        
        setLoading(false)
        
        if (!data) {
            console.log('Error saving location', err)
            return
        }

        dispatch({ type: 'UPDATE_LOCATION', location: data.location })
        
        setLocation(data.location)

        setModalVisible(false)
    }

    const renderHeader = () => (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 5,
            }}
        >
            <Text
                style={[
                    classes.headerSecondary,
                    {
                        flex: 1,
                        flexGrow: 0,
                        flexBasis: 'auto',
                    },
                ]}
            >
                Address
            </Text>
            
            
            <Pressable
                style={{
                    flexBasis: 'auto',
                    paddingHorizontal: 10,
                }}
                onPress={() => setModalVisible(true)}
                disabled={loading}
            >
                {location
                    ? (
                        <Icon name='create-outline' size={32} color='#fff' />
                    ) : (
                        <Icon name='add-outline' size={32} color='#fff' />
                    )
                }
                
            </Pressable>
        </View>
    )

    return (
        <View style={{ marginVertical: layout.verticalMargin }}>
            
            {renderHeader()}

            {loading
                ? <LoadingView label='Loading location...' />
                : location
                    ? <LocationDetails location={location} />
                    : (
                        <Pressable
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={classes.textDefault}>Add your location.</Text>
                        </Pressable>
                    )
            }

            <PopUpModal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <LocationForm
                    location={location || initialState}
                    onSubmit={onSubmitAddress}
                />
            </PopUpModal>
            
        </View>
    )
}