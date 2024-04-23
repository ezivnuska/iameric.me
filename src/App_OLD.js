import React from 'react'
import { Layout } from '@layout'
import Compose from './Compose'
import {
  AppContextProvider,
  AuthContextProvider,
  CartContextProvider,
  ContactContextProvider,
  FormContextProvider,
  ForumContextProvider,
  ModalContextProvider,
  OrderContextProvider,
  ProductContextProvider,
} from '@context'

export default () => (
    <Compose
      components={[
        AppContextProvider,
        AuthContextProvider,
        ModalContextProvider,
        ContactContextProvider,
        FormContextProvider,
        ForumContextProvider,
        ProductContextProvider,
        CartContextProvider,
        OrderContextProvider,
      ]}
    >
      <Layout />
    </Compose>
)