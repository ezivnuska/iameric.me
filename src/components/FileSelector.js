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
    dispatch({ type: 'SET_LOADING', loading: 'Opening file selector...' })
    const uri = await openFileSelector()
    dispatch({ type: 'SET_LOADING', loading: null })
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