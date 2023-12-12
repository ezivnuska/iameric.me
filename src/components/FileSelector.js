import React from 'react'
import {
    Platform,
    Text,
} from 'react-native'
import {
  openImagePickerAsync,
  openImageSelector,
} from 'src/utils/images'
import { Button } from 'antd'
import { openFileSelector } from '../utils/images'

export default ({ onSelected }) => {

  const onCancel = () => {
    console.log('trying to cancel from FileSelector component')
  }

  const handlePress = async () => {
    const uri = await openFileSelector(onCancel)
    onSelected(uri)
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