import React, { useContext, useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    Cart,
    IconButton,
    PopUpModal,
} from '.'
// import { ShoppingCartOutlined } from '@ant-design/icons'
// import { Button } from 'antd'
import { AppContext } from '../AppContext'
import { navigationRef } from '../navigators/RootNavigation'

export default () => {

    const {
        cart,
        dispatch,
    } = useContext(AppContext)

    const [modalVisible, setModalVisible] = useState(false)

    const onSubmitted = order => {
        setModalVisible(false)
        
        dispatch({ type: 'ADD_ORDER', order })
        
        navigationRef.navigate('Private', { screen: 'Orders' })
    }

    return (
        <View style={{
            marginHorizontal: 5,
        }}>
            <IconButton
                label={cart[0].items.length}
                iconName='cart-outline'
                bgColor='blue'
                onPress={() => setModalVisible(true)}
            />

            <PopUpModal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Cart
                    onSubmitted={onSubmitted}
                />
            </PopUpModal>

        </View>
    )
}