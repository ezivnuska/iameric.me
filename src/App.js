import React from 'react'
import { Layout } from '@layout'
import {
  AppContextProvider,
  FormContextProvider,
  ModalContextProvider,
} from '@context'
import Compose from './Compose'

export default () => (
	<Compose
		components={[
			AppContextProvider,
			FormContextProvider,
			ModalContextProvider,
		]}
	>
		<Layout />
	</Compose>
)