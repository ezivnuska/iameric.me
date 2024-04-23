import React from 'react'
import { Layout } from '@layout'
import Compose from '../Compose'
import {
  CartContextProvider,
  ContactContextProvider,
  ForumContextProvider,
  ModalContextProvider,
  OrderContextProvider,
  ProductContextProvider,
} from '@context'

export default () => (
    <Compose
      components={[
        ModalContextProvider,
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