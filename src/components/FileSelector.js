import React from 'react'
import { IconButton } from '.'
import { openFileSelector } from '@utils/images'

export default ({ onSelected }) => {

  const handlePress = async () => {
    const uri = await openFileSelector()
    onSelected(uri)
  }

  return (
    <IconButton
      type='primary'
      label='Select'
      onPress={handlePress}
      // disabled={loading}
    />
  )
}