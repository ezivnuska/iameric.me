import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    ImageDetail,
    ImageList,
    ImageUploader,
    LoadingView,
    ModalContent,
} from '.'
import {
    PlusCircleOutlined,
} from '@ant-design/icons'
import main from '../styles/main'
import layout from '../styles/layout'
import { AppContext } from '../AppContext'

export default () => {

    const {
        dispatch,
        user,
    } = useContext(AppContext)

    const [modalVisible, setModalVisible] = useState(false)

    const [featured, setFeatured] = useState(null)
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState(null)

    useEffect(() => {
        if (user.images) {
            // console.log('setting images', user.images)
            setItems(user.images)
        }
    }, [user.images])

    const onImageUploaded = id => {
        // console.log('image uploaded. current items:', items)
        setItems([...items, id])
        
        dispatch({ type: 'ADD_IMAGE', id })

        setModalVisible(false)
    }

    const onDelete = id => {

        // setItems(items.filter(item =>
        //     typeof item === 'string'
        //     ? item !== id
        //     : item._id !== id
        // ))

        dispatch({ type: 'REMOVE_IMAGE', id })
        
        setFeatured(null)
    }

    const onAvatarSet = profileImage => {
        dispatch({ type: 'SET_PROFILE_IMAGE', profileImage })
        setFeatured(null)
    }

    const onSelected = image => {
        // console.log(`selecting ${image._id} from items:`, items)
        const selectedItem = items.filter(item => item._id === image._id)[0]
        // console.log('selected item', selectedItem)
        setFeatured(selectedItem)
    }

    return (
        <View style={{ marginVertical: layout.verticalMargin }}>
                
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginBottom: 15,
                }}
            >
                
                <Text style={main.heading}>Images &amp; Avatar</Text>
                
                <View
                    style={{
                        flex: 1,
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                    }}
                >
                    <TouchableOpacity
                        style={{
                            marginVertical: 4,
                            marginHorizontal: 7,
                        }}
                        onPress={() => setModalVisible(true)}
                    >
                        <PlusCircleOutlined
                            style={{ fontSize: 22 }}
                        />
                    </TouchableOpacity>
                </View>

            </View>

            {(items && items.length) ? (
                <ImageList
                    images={items}
                    user={user}
                    onSelected={onSelected}
                />
            ) : <Text>No images to display.</Text>}
            
            <ModalContent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                label='Upload an Image'
            >
                <ImageUploader
                    user={user}
                    onImageUploaded={onImageUploaded}
                />
            </ModalContent>

            <ModalContent
                visible={featured}
                onRequestClose={() => setFeatured(null)}
                label='Image Detail'
            >
                <ImageDetail
                    image={featured}
                    onAvatarSet={onAvatarSet}
                    onDelete={onDelete}
                />
            </ModalContent>
        </View>
    )
}