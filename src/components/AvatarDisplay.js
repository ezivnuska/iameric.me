import React, { useContext, useState } from 'react'
import {
    StyleSheet,
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
        user,
    } = useContext(AppContext)

    const [modalVisible, setModalVisible] = useState(false)

    const [featured, setFeatured] = useState(null)
    const [loading, setLoading] = useState(false)

    const onImageUploaded = id => {

        setModalVisible(false)
    }

    return (
        <View
            style={{
                marginVertical: layout.verticalMargin,
            }}
        >
                
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

            {(user.images && user.images.length) ? (
                <ImageList
                    images={user.images}
                    loading={loading}
                    user={user}
                    setFeatured={setFeatured}
                />
            ) : null}
            
            <ModalContent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                label='Upload an Image'
            >
                {!loading ? (
                    <ImageUploader
                        user={user}
                        onComplete={onImageUploaded}
                        setLoading={setLoading}
                    />
                ) : (
                    <LoadingView label={loading} />
                )}
            </ModalContent>

            <ModalContent
                visible={featured}
                onRequestClose={() => setFeatured(null)}
                label='Image Detail'
            >
                <ImageDetail
                    image={featured}
                    onComplete={() => setFeatured(null)}
                />
            </ModalContent>
        </View>
    )
}