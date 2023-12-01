import React, { useContext, useEffect, useState } from 'react'
import {
    Pressable,
    Text,
    View,
} from 'react-native'
import {
    LocationForm,
    LocationDetails,
    ModalContent,
} from '.'
import {
    EditOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons'
import { Button } from 'antd'
import axios from 'axios'
import layout from '../styles/layout'
import { AppContext } from '../AppContext'
import { getLocationWithUserId } from '../utils/data'

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
    const [loaded, setLoaded] = useState(false)
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
            }}
        >
            <Text
                style={{
                    flex: 1,
                    flexGrow: 0,
                    flexBasis: 'auto',
                    fontSize: 24,
                    fontWeight: 700,
                    lineHeight: 32,
                }}
            >
                Address
            </Text>
            
            <View style={{
                flex: 1,
                flexGrow: 0,
                flexShrink: 1,
                flexBasis: 'auto',
                paddingHorizontal: 10,
            }}>
                <Button
                    size='small'
                    shape='circle'
                    icon={location ? <EditOutlined /> : <PlusCircleOutlined />}
                    onClick={() => setModalVisible(true)}
                    disabled={loading}
                />
            </View>
        </View>
    )

    return (
        <View style={{ marginVertical: layout.verticalMargin }}>
            
            {renderHeader()}

            {location
                ? <LocationDetails location={location} />
                : <Text style={{ color: '#aaa' }}>Add your location.</Text>
            }

            <ModalContent
                animationType='slide'
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                label={'Manage Location'}
            >
                <LocationForm
                    location={location || initialState}
                    onSubmit={onSubmitAddress}
                />
            </ModalContent>
            
        </View>
    )
}