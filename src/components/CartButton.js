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
import { navigate } from '../navigators/RootNavigation'

export default () => {

    const {
        cart,
    } = useContext(AppContext)

    const [modalVisible, setModalVisible] = useState(false)

    const onSubmitCart = () => {
        setModalVisible(false)
        
        navigate('Orders')
    }

    return (
        <View style={{
            marginHorizontal: 5,
        }}>
            <IconButton
                label={cart.length}
                iconName='cart-outline'
                bgColor='blue'
                onPress={() => setModalVisible(true)}
            />

            <PopUpModal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Cart
                    onSubmitOrder={onSubmitCart}
                />
            </PopUpModal>

        </View>
    )
}