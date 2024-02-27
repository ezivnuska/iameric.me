import React, { useContext, useEffect } from 'react'
import {
    LocationForm,
} from '.'
import { AppContext } from '../AppContext'

export default () => {
    
    const {
        location,
    } = useContext(AppContext)
    
    return (
        <LocationForm location={location} />
    )
}