import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    Cart,
    ModalContainer,
    ModalContent,
    PanelView,
} from '.'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'

const CartButton = () => {

    const {
        dispatch,
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
        <View style={styles.container}>
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

export default CartButton

const styles = StyleSheet.create({
    container: {
        marginRight: 15,
    },
})