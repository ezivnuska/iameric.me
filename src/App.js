import React from 'react'
import {
  AppView,
} from '@layout'
import {
  AppContextProvider,
} from '@context'

export default () => (
  <AppContextProvider>
    <AppView />
  </AppContextProvider>
)