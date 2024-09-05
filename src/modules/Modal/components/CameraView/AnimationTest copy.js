import React, { useRef, useState } from 'react'
import {
	Animated,
	Pressable,
	View,
} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { FlashMode } from 'expo-camera'
import { useApp } from '@app'
import { useBips } from '@bips'
import { useModal } from '@modal'
import { useSocket } from '@socket'

export default () => {

  const { dims } = useApp()
  const { clearModal } = useModal()

  const transition = useRef(new Animated.Value(1)).current

  const animate = () => {
		console.log('animating...')
		Animated.timing(transition, {
			toValue: 0,
			duration: 3000,
			useNativeDriver: true,
		}).start()
  }
  	const [ initialHeight, setInitialHeight ] = useState(null)
	return (
		<View
			onLayout={e => setInitialHeight(e.nativeEvent.target.clientHeight * 0.6)}
			style={{
				// flex: 1,
				height: '100%',
				backgroundColor: '#000',
				justifyContent: 'flex-start',
				// dev
				borderWidth: 1,
				borderColor: '#fff',
				borderStyle: 'dashed',
			}}
		>
			{initialHeight && (
				<Animated.View
					style={{
						flexShrink: 1,
						flexBasis: transition.interpolate({
							inputRange: [0, 1],
							outputRange: [0, initialHeight],
						}),
					}}
				>
					<View
						style={{
							flex: 1,
						}}
					>
						<Pressable
							onPress={animate}
							style={{
								flex: 1,
							}}
						/>
					</View>
				</Animated.View>
			)}

			<View
				style={{
					flex: 1,
				}}
			>

			</View>
		</View>
	)
}