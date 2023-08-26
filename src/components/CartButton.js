import React, { useContext, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    Cart,
    ModalContainer,
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
                {cart.items.length}
            </Button>

            <ModalContainer
                animationType='slide'
                transparent={false}
                visible={modalVisible}
                closeModal={() => setModalVisible(false)}
                label='Cart'
            >
                <Cart
                    onSubmitOrder={onSubmitCart}
                />
            </ModalContainer>

        </View>
    )
}

export default CartButton

const styles = StyleSheet.create({
    container: {
        marginRight: 15,
    },
})