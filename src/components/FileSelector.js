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
          const uploadResult = await FileSystem.uploadAsync('/api/upload/avatar', pickerResult.uri, {
              httpMethod: 'POST',
              // uploadType: FileSystemUploadType.MULTIPART,
              fieldName: 'file'
          })

          console.log('uploadResult', uploadResult)
          handleDrop(uploadResult.assets[0].uri)
      }
  }

  const handlePress = () => {
    if (Platform.OS === 'web') selectImage()
    else openImagePickerAsync()
  }

  const selectImage = async () => {
    // console.log('selectImage')
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
    // marginVertical: 20,
    marginHorizontal: 'auto',
    width: 300,
    borderRadius: 20,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#ccc',
  },
  selectButtonTitle: {
    padding: 10,
    fontSize: 18,
    marginHorizontal: 'auto',
  }
})