import React, { useContext, useEffect, useState } from 'react'
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'

import {
    Menu,
    ModalContainer,
    UserListItem,
} from '.'
import { navigate } from '../navigators/RootNavigation'

const UserList = ({ onItemPressed, users }) => {

    const [items, setItems] = useState([])
    const [feature, setFeature] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        if (users) setItems(users)
    }, [users])

    const onPress = user => {
        setFeature(user)
        // setModalVisible(true)
        navigate('vendor', { vendor: user })
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={items}
                listKey={() => 'users'}
                keyExtractor={(item, index) => 'user' + index}
                renderItem={({ item }) => (
                    <UserListItem
                        user={item}
                        onPress={onPress}
                    />
                )} 
            />

            {/* <ModalContainer
                animationType='slide'
                transparent={false}
                visible={modalVisible}
                closeModal={() => setModalVisible(false)}
            >
                <Menu
                    vendorId={feature ? feature._id : null}
                />
            </ModalContainer> */}
        </View>
    )
}

export default UserList

const styles = StyleSheet.create({
    container: {
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center',
        paddingHorizontal: 3,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 6,
    },
    list: {
        // flex: 1,
        // alignSelf: 'center',
        // width: 300,
        // minWidth: 300,
        // maxWidth: 300,
        // borderWidth: 2,
        // borderColor: '#f00',
        paddingVertical: 3,
    },
})