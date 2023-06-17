import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    AvatarModule,
    DeleteAccountButton,
    ImageList,
    ProductForm,
    ProductList,
    Module,
} from '../components'
import {
    Screen,
} from '.'
import { AppContext } from '../AppContext'
import axios from 'axios'

const SettingsScreen = ({ ...props }) => {

    const {
        dispatch,
        state,
    } = useContext(AppContext)

    const { user } = state

    const [items, setItems] = useState(null)

    useEffect(() => {
        if (user && user.role === 'vendor') getProducts()
    }, [])

    const getProducts = () => {
        axios
            .get(`/api/products/${user._id}`)
            .then(({ data }) => {
                console.log('DATA', data.items)
                setItems(data.items)
            })
            .catch(err => console.log('Error:', err))
    }

    const onDelete = id => {
        axios
            .delete('/api/products/delete', { data: { id } })
            .then(({ data }) => console.log('deleted data', data))
            .catch(err => console.log('Error deleting product', err))
    }

    return (
        <Screen { ...props }>
            <View style={styles.container}>
                <View style={styles.modules}>
                    <Module>
                        <View>
                            <ProductForm
                                addItem={item => setItems([
                                    item,
                                    ...items,
                                ])}
                                updateStatus={() => console.log('updateStatus')}
                            />
                            {items && (
                                <ProductList
                                    deleteItem={onDelete}
                                    items={items}
                                />
                            )}
                        </View>
                    </Module>
                    <Module>
                        <View>
                            <AvatarModule />
                            <ImageList />
                        </View>
                    </Module>
                </View>
                <Module>
                    <DeleteAccountButton />
                </Module>
            </View>
        </Screen>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    modules: {
        flex: 1,
        flexShrink: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        width: 550,
        minWidth: '70%',
        maxWidth: 900,
    },
})