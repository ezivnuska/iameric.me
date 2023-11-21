import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
    TouchableOpacity,
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
import axios from 'axios'
import main from '../styles/main'
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

export default () => {

    const {
        user,
    } = useContext(AppContext)

    const [location, setLocation] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getLocationData(user._id)
    }, [])

    useEffect(() => {
        // if (user && !loading && !loaded) {
        //     getLocationData(user._id)
        // }
    }, [user])

    useEffect(() => {
        if (!loading) setLoaded(true)
        else setLoaded(false)
    }, [loading])

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
        
        setLocation(data.location)

        setModalVisible(false)
    }

    const renderLocationDetails = () => loading
        ? <Text style={{ color: '#aaa' }}>Loading Address...</Text>
        : location
            ? <LocationDetails location={location} />
            : <Text style={{ color: '#aaa' }}>Add your location.</Text>

    const renderHeader = () => (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
            }}
        >
                
            <Text style={[main.heading, { marginBottom: 5 }]}>Address</Text>
            
            <TouchableOpacity
                style={{
                    flex: 1,
                    flexGrow: 0,
                    flexShrink: 1,
                    flexBasis: 'auto',
                    marginVertical: 4,
                    marginHorizontal: 7,
                }}
                onPress={() => setModalVisible(true)}
                disabled={loading}
            >
                {location
                    ? <EditOutlined style={{ fontSize: 22 }} />
                    : <PlusCircleOutlined style={{ fontSize: 22 }} />
                }
                
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={{ marginVertical: layout.verticalMargin }}>
            
            {renderHeader()}

            {renderLocationDetails()}

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