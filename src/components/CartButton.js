import React, { useContext, useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    Cart,
    PopUpModal,
} from '.'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Button } from 'antd'
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
            <Button
                type='primary'
                icon={<ShoppingCartOutlined />}
                size='small'
                onClick={() => setModalVisible(true)}
            >   
                &nbsp;
                {cart.length}
            </Button>

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