import React, { useEffect, useMemo } from 'react'
import { Layout } from '@layout'
import {
  AppContextProvider,
  ContactContextProvider,
  FormContextProvider,
  ModalContextProvider,
  OrderContextProvider,
  ProductContextProvider,
} from '@context'
import Compose from './Compose'
// import socket from './socket'

export default () => {

	// const path = process.env.NODE_ENV === 'production' ? undefined : `http://localhost:4321`
	// // const path = `http://localhost:4321`
	// const socket = io(path, {
	// 	withCredentials: true,
	// })

	useEffect(() => {
		console.log('APP')
	}, [])
	
	// socket.on('connection', () => {
	// 	socket.emit('i_hear_ya')
	// })

	return (
		<Compose
			components={[
				OrderContextProvider,
				ProductContextProvider,
				ContactContextProvider,
				FormContextProvider,
				ModalContextProvider,
				AppContextProvider,
			]}
		>
			<Layout />
		</Compose>
	)
}