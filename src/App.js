import React from 'react'
import { Layout } from '@layout'
import { AppContextProvider } from './AppContext'

export default () => {

    return (
        <AppContextProvider>
            <Layout />
        </AppContextProvider>
    )
}