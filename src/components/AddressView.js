import React from 'react'
import { ThemedText } from '@components'

export default ({ address, loading, color = '#000' }) => {
    if (loading) return <ThemedText color={color}>Determining address...</ThemedText>
    if (!address) return <ThemedText color={color}>No address available</ThemedText>
    const { streetNumber, streetName, cityName } = address
    return <ThemedText color={color} bold>{`${streetNumber} ${streetName}, ${cityName}`}</ThemedText>
}