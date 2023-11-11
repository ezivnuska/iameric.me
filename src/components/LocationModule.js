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
import { AppContext } from '../AppContext'
import axios from 'axios'
import main from '../styles/main'
import layout from '../styles/layout'

const initialState = {
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
}

export default ({ userId }) => {

    // const {
    //     user,
    // } = useContext(AppContext)

    const [location, setLocation] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // console.log('user:location:', location)
        getLocation()
        // else if (!location) setLocation(user.location)
    }, [])

    const getLocation = async () => {
        setLoading(true)
        
        const { data } = await axios
            .get(`/api/location/${userId}`)
        
        setLoading(false)

        if (!data) {
            console.log('Error getting location.')
            return
        }

        setLocation(data.location)
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

    const renderLocationDetails = () => location
        ? <LocationDetails location={location} />
        : <Text style={{ color: '#aaa' }}>Loading Address...</Text>

    const renderHeader = () => (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
            }}
        >
                
            <Text style={[main.subheading, { marginBottom: 5 }]}>Address</Text>
            
            <View
                style={{
                    flex: 1,
                    flexGrow: 0,
                    flexShrink: 1,
                    flexBasis: 'auto',
                }}
            >
                {renderButton()}
            </View>
        </View>
    )

    const renderButton = () => (
        <TouchableOpacity
            style={{ marginHorizontal: 7 }}
            onPress={() => setModalVisible(true)}
            disabled={loading}
        >
            {location
                ? <EditOutlined style={{ fontSize: 20 }} />
                : <PlusCircleOutlined style={{ fontSize: 20 }} />
            }
            
        </TouchableOpacity>
    )

    const renderModal = () => (
        <ModalContent
            animationType='slide'
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            label={'Manage Location'}
        >
            <LocationForm
                location={location}
                onSubmit={onSubmitAddress}
            />
        </ModalContent>
    )

    return (
        <View style={{ marginVertical: layout.verticalMargin }}>
            
            {renderHeader()}

            {renderLocationDetails()}

            {renderModal()}
            
        </View>
    )
}