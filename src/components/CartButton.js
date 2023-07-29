import React, { useContext, useState } from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native'
import {
    Cart,
    ModalContainer,
} from '.'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { AppContext } from '../AppContext'

const CartButton = () => {

    const {
        dispatch,
        state,
    } = useContext(AppContext)

    const { cart } = state

    const [modalVisible, setModalVisible] = useState(false)

    return (
        <View style={styles.container}>
            
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
            >
                <ShoppingCartOutlined style={{ color: '#fff', fontSize: 20 }} />
            </TouchableOpacity>

            <ModalContainer
                animationType='slide'
                transparent={false}
                visible={modalVisible}
                closeModal={() => setModalVisible(false)}
            >
                <Cart items={cart.items} />
            </ModalContainer>

        </View>
    )
}

export default CartButton

const styles = StyleSheet.create({
    container: {

    },
})