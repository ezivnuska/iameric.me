import React from 'react'
import {
    Platform,
    Text,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { Button } from 'antd'

export default ({ onSelected }) => {

  const openImagePickerAsync = async () => {
    
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!')
          return
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync()
      
      if (!pickerResult.canceled) {
          const uploadResult = await FileSystem.uploadAsync('/api/upload/avatar', pickerResult.uri, {
              httpMethod: 'POST',
              // uploadType: FileSystemUploadType.MULTIPART,
              fieldName: 'file'
          })

          onSelected(uploadResult.assets[0].uri)
      }
  }

  const handlePress = () => {
    if (Platform.OS === 'web') openImageSelector()
    else openImagePickerAsync()
  }
  
  const openImageSelector = async () => {
    
    // let options = {
    //   title: 'You can choose one image',
    //   maxWidth: 256,
    //   maxHeight: 256,
    //   storageOptions: {
    //     skipBackup: true
    //   }
    // }
    
    const { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        quality: 1,
    })
    
    if (canceled) return
    
    onSelected(assets[0].uri)
  }

  return (
    <Button
      // type='primary'
      size='small'
      onClick={handlePress}
    >
      <Text
        // style={styles.selectButtonTitle}
      >
        Pick Image
      </Text>

    </Button>
  )
}