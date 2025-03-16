import React from'react'
import { ScrollView, View } from'react-native'
import { Card, IconButton, Text } from'react-native-paper'
import { useModal, useTheme } from '@context'

const ModalContainer = ({ title, children }) => {
    
    const { dims } = useTheme()

    return (
        <Card
            elevation={1}
            style={{
                flex: 1,
                paddingTop: 10,
                paddingBottom: 15,
                gap: 10,
                width: '90%',
                maxWidth: 400,
                maxHeight: dims.height * 0.9,
                marginHorizontal: 'auto',
            }}
        >

            {title && <ModalHeader title={title} />}

            <ScrollView
                style={{
                    flex: 1,
                    marginVertical: 0,
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 10,
                    paddingHorizontal: 15,
                }}
            >
                <View style={{ gap: 10 }}>
                    {children}
                </View>
            </ScrollView>
        </Card>
    )
}

export default ModalContainer



const ModalHeader = ({ title }) => {

    const { closeModal } = useModal()
    
    return (
        <View
            style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 15,
                paddingRight: 5,
            }}
        >
            <Text
                variant='headlineSmall'
                style={{ flex: 1 }}
            >
                {title}
            </Text>

            <IconButton
                icon='close-thick'
                onPress={closeModal}
                style={{ margin: 0, padding: 0 }}
            />
        </View>
    )
}