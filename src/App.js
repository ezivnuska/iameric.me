import React from 'react'
import {
	Layout,
} from '@layout'
import {
  AppContextProvider,
  FormContextProvider,
  ModalContextProvider,
  UserContextProvider,
} from '@context'
import Compose from './Compose'

export default () => (
	<Compose
		components={[
			FormContextProvider,
			ModalContextProvider,
			AppContextProvider,
		]}
	>
		<UserContextProvider>
			<Layout />
		</UserContextProvider>
	</Compose>
)