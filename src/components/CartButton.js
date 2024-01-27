import React, { useContext, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    Cart,
    IconButton,
    PopUpModal,
} from '.'
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

    const getItemCount = items => {
        let count = 0
        items.map(item => count += item.quantity)
        return count
    }

    return (
        <View style={{
            marginHorizontal: 5,
        }}>
            <IconButton
                label={getItemCount(cart[0].items)}
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