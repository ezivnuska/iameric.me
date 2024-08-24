import React from 'react'
import { ThemedText } from '@components'

export default ({ address, loading }) => {
    if (loading) return <ThemedText>Determining address...</ThemedText>
    if (!address) return <ThemedText>No address available</ThemedText>
    const { streetNumber, streetName, cityName } = address
    return <ThemedText>{`${streetNumber} ${streetName}, ${cityName}`}</ThemedText>
}