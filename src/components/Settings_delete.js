import React, { useContext, useEffect } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    AvatarModule,
    DeleteAccountButton,
    ImageList,
    ProductList,
    ProductForm,
    Module,
} from '.'
import { AppContext } from '../AppContext'

const Settings = () => {
    const {
        state,
        dispatch,
    } = useContext(AppContext)
    const { user } = state
    useEffect(() => {
        console.log('user...', user)
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.modules}>
                {(user && user.role === 'vendor') ? (
                    <Module>
                        <ProductForm
                            addItem={() => console.log('addItem')}
                            updateStatus={() => console.log('updateStatus')}
                        />
                        <ProductList items={[{ _id: 1, title: 'one' }, { _id: 2, title: 'two' }]} />
                    </Module>
                ) : null}
                <Module>
                    <AvatarModule />
                    <ImageList />
                </Module>
            </View>
            <Module>
                <DeleteAccountButton />
            </Module>
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        width: '100%',
        minWidth: 300,
        maxWidth: 900,
    },
    modules: {
        flex: 1,
        flexShrink: 1,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        width: '70%',
        minWidth: 300,
        maxWidth: 900,
    },
})