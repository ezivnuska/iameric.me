import React, { useState } from 'react'
import {
  IconButton,
} from '.'
import { openFileSelector } from '../utils/images'

export default ({ onSelected }) => {

  const [loading, setLoading] = useState(false)

  const handlePress = async () => {
    setLoading(true)
    const uri = await openFileSelector()
    setLoading(false)
    onSelected(uri)
  }

  return (
    <IconButton
      label='Select'
      onPress={handlePress}
      disabled={loading}
      bgColor='blue'
    />
  )
}