import React, { useContext, useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    Cart,
    ModalContent,
} from '.'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'

export default () => {

    const {
        state,
    } = useContext(AppContext)

    const { cart } = state

    const [modalVisible, setModalVisible] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        setItems(cart.items)
    }, [cart])

    const onSubmitCart = () => {
        setModalVisible(false)
        navigate('Home')
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
                {items.length}
            </Button>

            <ModalContent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                label='Cart'
            >
                <Cart
                    onSubmitOrder={onSubmitCart}
                />
            </ModalContent>

        </View>
    )
}