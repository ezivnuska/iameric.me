import React, { useContext } from 'react'
import {
  IconButton,
} from '.'
import { openFileSelector } from '../utils/images'
import { AppContext } from '../AppContext'

export default ({ onSelected }) => {

  const {
    dispatch,
    loading,
  } = useContext(AppContext)

  const handlePress = async () => {
    const uri = await openFileSelector()
    onSelected(uri)
  }

  return (
    <IconButton
      type='primary'
      label='Select'
      onPress={handlePress}
      disabled={loading}
    />
  )
}