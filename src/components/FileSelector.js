import React, { useState } from 'react'
import {
    Alert,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
// import ImagePicker, { launchCamera, launchImageLibrary } from 'react-native-image-picker'

const FileSelector = () => {
  const [imageSource, setImageSource] = useState(null)

  const selectImage = () => {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true
      }
    }

    console.log('Platform.OS', Platform.OS)
    alert(`Platform.OS: ${Platform.OS}`)

    if (Platform.OS === 'ios' || Platform.OS === 'android') {
        // launchImageLibrary()
    } else {
        // ImagePicker.showImagePicker(options, response => {
        //     console.log({ response })
      
            // if (response.didCancel) {
            //   console.log('User cancelled photo picker')
            //   Alert.alert('You did not select any image')
            // } else if (response.error) {
            //   console.log('ImagePicker Error: ', response.error)
            // } else if (response.customButton) {
            //   console.log('User tapped custom button: ', response.customButton)
            // } else {
            //   let source = { uri: response.uri }
            //   console.log({ source })
            // }
        // })
    }
    
  }

  return (
    <View
      style={[
        STYLES.flex,
        STYLES.centerContainer,
        // { backgroundColor: '#0f0' }
      ]}
    >
        <Text style={[
            STYLES.title,
            // { color: '#f00' }
        ]}>
            Simple Image Picker
        </Text>
        <TouchableOpacity
            onPress={selectImage}
            style={[
                STYLES.selectButtonContainer,
                // { backgroundColor: '#00f' }
            ]}
        >
        <Text style={STYLES.selectButtonTitle}>Pick an image</Text>
      </TouchableOpacity>
    </View>
  )
}

export default FileSelector

const STYLES = StyleSheet.create({
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