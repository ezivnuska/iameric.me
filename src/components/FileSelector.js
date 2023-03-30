import React, { useState } from 'react'
import {
    Alert,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
const API_PATH = '/api'

const FileSelector = ({ handleDrop }) => {

  const openImagePickerAsync = async () => {
    console.log('opening image picker')
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!')
          return
      }
      let pickerResult = await ImagePicker.launchImageLibraryAsync()
      if (!pickerResult.cancelled) {
          const uploadResult = await FileSystem.uploadAsync(`${API_PATH}/upload/avatar`, pickerResult.uri, {
              httpMethod: 'POST',
              // uploadType: FileSystemUploadType.MULTIPART,
              fieldName: 'file'
          })

          console.log('uploadResult', uploadResult)
          handleDrop(uploadResult.assets[0].uri)
      }
  }

  const handlePress = () => {
    console.log('handlePress', Platform.OS)
    if (Platform.OS === 'web') selectImage()
    else openImagePickerAsync()
  }

  const selectImage = async () => {
    console.log('selectImage')
    // let options = {
    //   title: 'You can choose one image',
    //   maxWidth: 256,
    //   maxHeight: 256,
    //   storageOptions: {
    //     skipBackup: true
    //   }
    // }

    let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        quality: 1,
    })

    if (result.canceled) return
    
    console.log('web result', result, handleDrop)
    handleDrop(result.assets[0].uri)
    
  }

  return (
    <View
      style={[
        styles.flex,
        styles.centerContainer,
        // { backgroundColor: '#0f0' }
      ]}
    >
        <TouchableOpacity
            onPress={handlePress}
            style={[
              styles.selectButtonContainer,
                // { backgroundColor: '#00f' }
            ]}
        >
        <Text style={styles.selectButtonTitle}>Pick an image</Text>
      </TouchableOpacity>
    </View>
  )
}

export default FileSelector

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 22
  },
  // add below
  selectButtonContainer: {
    margin: 20,
    borderRadius: 5
  },
  selectButtonTitle: {
    padding: 10,
    fontSize: 18
  }
})