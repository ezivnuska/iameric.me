import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    AvatarModule,
    ImageList,
    ModalContainer,
} from '.'
import {
    PlusCircleOutlined,
} from '@ant-design/icons'
import defaultStyles from '../styles/main'

const AvatarDisplay = () => {
    
    const [modalVisible, setModalVisible] = useState(false)
    
    return (
        <View style={styles.container}>
                
            <View style={styles.displayHeader}>
                
                <Text style={defaultStyles.heading}>Images &amp; Avatar</Text>
                
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <PlusCircleOutlined
                            style={{ fontSize: 22 }}
                        />
                    </TouchableOpacity>
                </View>

            </View>

            <ImageList />
            
            <ModalContainer
                animationType='slide'
                transparent={false}
                visible={modalVisible}
                closeModal={() => setModalVisible(false)}
                label='Avatar Modal'
            >
                <AvatarModule onComplete={() => setModalVisible(false)} />
            </ModalContainer>
        </View>
    )
}

export default AvatarDisplay

const styles = StyleSheet.create({
    container: {
        padding: 10,
		minWidth: 350,
        maxWidth: 375,
        width: 375,
    },
    displayHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 15,
    },
    title: {
        flex: 1,
        flexBasis: 'auto',
        flexGrow: 0,
        flexShrink: 0,
        fontSize: 24,
    },
    buttons: {
        flex: 1,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
    },
    headerButton: {
        marginVertical: 4,
        marginHorizontal: 7,
    },
})