import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Button, Card } from 'react-native-paper'

const ImagePickerView = ({ active, cancel, select, disabled = false }) => {
    return (
        <Card style={{ flex: 1 }}>
            
            <Card.Title
                right={() => <IconButton icon='close-thick' onPress={closeModal} size={30} />}
            />
            
            <Card.Content>
                {active && <ActivityIndicator size='medium' />}
            </Card.Content>
            
            <Card.Actions
                style={{
                    flexDirection: 'column',
                    alignItems: 'stretch',
                }}
            >
                <Button
                    mode='contained'
                    onPress={select}
                    disabled={disabled}
                >
                    Select Image
                </Button>
    
                <Button
                    mode='contained'
                    onPress={cancel}
                    disabled={disabled}
                >
                    Cancel
                </Button>

            </Card.Actions>
        </Card>
    )
    return (
        (
            <View
                style={{
                    flex: 1,
                    flexGrow: 1,
                    gap: 30,
                    paddingHorizontal: 10,
                }}
            >
                {active && <ActivityIndicator size='medium' />}
        
                <View
                    style={{
                        flex: 1,
                        gap: 10,
                    }}
                >
                
                    <Button
                        mode='contained'
                        onPress={select}
                        disabled={disabled}
                    >
                        Select Image
                    </Button>
        
                    <Button
                        mode='contained'
                        onPress={cancel}
                        disabled={disabled}
                    >
                        Cancel
                    </Button>
        
                </View>
            </View>
        )
    )
}

export default ImagePickerView