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

const AvatarDisplay = () => {
    
    const [modalVisible, setModalVisible] = useState(false)
    
    return (
        <View style={styles.container}>
                
            <View style={styles.displayHeader}>
                <Text style={styles.title}>Images &amp; Avatar</Text>
                <View style={styles.buttonContainer}>
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
            >
                <AvatarModule onComplete={() => setModalVisible(false)} />
            </ModalContainer>
        </View>
    )
}

export default AvatarDisplay

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    displayHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // borderWidth: 1,
        // borderColor: 'blue',
    },
    title: {
        // flex: 1,
        // flexBasis: 'auto',
        // flexGrow: 0,
        // flexShrink: 1,
        fontSize: 24,
        // lineHeight: 30,
        // borderWidth: 1,
        // borderColor: 'green',
    },
    buttonContainer: {
        paddingVertical: 2,
        paddingHorizontal: 5,
        // display: 'flex',
        // flexDirection: 'row',
        // alignItems: 'stretch',
        // lineHeight: 60,
        // borderWidth: 1,
        // borderStyle: 'dotted',
        // borderColor: 'purple',
    },
    headerButton: {
        alignContent: 'center',
        flex: 1,
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto',
        // lineHeight: 30,
        height: 30,
        // width: 30,
        // borderWidth: 1,
        // borderColor: 'red',
    },
})