import React, { useCallback, useState } from 'react'
import {
  Text,
  TextInput,
  View,
} from 'react-native'
import { useDropzone } from 'react-dropzone'

const Dropzone = ({ children, handleDrop, noClick, preview = null, ...props }) => {

  const [ size, setSize ] = useState(300)
  const [ avatar, setAvatar ] = useState(preview)
  
  const onDrop = useCallback(accepted => {

    const reader = new FileReader()
    
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading failed')
    reader.onload = e => {
      e.preventDefault()
      const result = e.target.result
      // console.log('result', result)
      handleDrop(result)
    }

    reader.readAsDataURL(accepted[0])
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png'],
    },
    multiple: false,
    noClick,
  })
  
  return (
    <View {...getRootProps()} {...props}>
      <TextInput {...getInputProps()} />
      
      <Text style={{
          width: size + 'px',
          height: size + 'px',
          lineHeight: size + 'px',
          // background: profileImage ? `url(${webConfig.bucketUrl}/${webConfig.profileImagesPath}/${profileImage})` : `url(${webConfig.assetURL}/graphics/default-avatar.png)`,
          backgroundSize: 'cover',
          textAlign: 'center',
        }}
      >
        Drop file here, or click to select file.
      </Text>
    </View>
  )
}

export default Dropzone