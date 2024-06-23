import React from 'react'
import { FormContextProvider } from './FormContext'
import FormPanel from './FormPanel'

export default ({ type }) => {

    return (
        <FormContextProvider>
            <FormPanel type={type} />
        </FormContextProvider>
    )
}