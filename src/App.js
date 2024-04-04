import React from 'react'
import { Layout } from './layout'
import Compose from './Compose'
import {
  AppContextProvider,
  AuthContextProvider,
  CartContextProvider,
  ContactContextProvider,
  ForumContextProvider,
  ModalContextProvider,
  OrderContextProvider,
  ProductContextProvider,
  UserContextProvider,
} from '@context'

export default () => (
    <Compose
      components={[
        AppContextProvider,
        AuthContextProvider,
        ModalContextProvider,
        UserContextProvider,
        ContactContextProvider,
        ForumContextProvider,
        ProductContextProvider,
        CartContextProvider,
        OrderContextProvider,
      ]}
    >
      <Layout />
    </Compose>
)