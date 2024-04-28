import React from 'react'
import {
  Layout,
} from '@layout'
import {
  AppContextProvider,
  FormContextProvider,
} from '@context'
import Compose from './Compose'

export default () => (
	<Compose
		components={[
			FormContextProvider,
			AppContextProvider,
		]}
	>
		<Layout />
	</Compose>
)