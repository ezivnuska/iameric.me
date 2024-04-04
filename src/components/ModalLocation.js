import React, { useContext, useEffect } from 'react'
import {
    LocationForm,
} from '.'
import { AppContext } from '@context'

export default () => {
    
    const {
        location,
    } = useContext(AppContext)
    
    return (
        <LocationForm location={location} />
    )
}