import React from 'react'
import { SimpleButton } from '@components'
import { openFileSelector } from '@utils/images'

export default ({ onSelected }) => {

  const handlePress = async () => {
    const uri = await openFileSelector()
    onSelected(uri)
  }

  return (
    <SimpleButton
      label='Select'
      onPress={handlePress}
      // disabled={loading}
    />
  )
}