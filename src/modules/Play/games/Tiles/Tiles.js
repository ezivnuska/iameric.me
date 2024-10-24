import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated'
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
} from 'react-native-gesture-handler'
import {
	GameHeader,
	Tile,
	SquareWithLabel,
} from './components'
import { getModifiedColor } from '@utils'

export default () => {

	const [level, setLevel] = useState(4)
	const [initialTiles, setInitialTiles] = useState([])
	
	const [gameSize, setGameSize] = useState(null)
	const [gameStatus, setGameStatus] = useState('start')

	// useEffect(() => {
	// 	switch (gameStatus) {
	// 		case 'idle':
	// 		case 'active':
	// 		case 'paused':
	// 		case 'resolved':
	// 			break
	// 		default:
	// 	}
	// }, [gameStatus])

	const onLayout = e => {
		if (e.nativeEvent.target.offsetParent) {
			setGameSize(e.nativeEvent.target.offsetParent.clientWidth)
		}
	}

	const createInitialTiles = async () => {
		const tileArray = []
		while (tileArray.length < level * level - 1) {
			const col = tileArray.length % level
			const row = Math.floor(tileArray.length / level)
			let newTile = {
				id: tileArray.length,
				col,
				row,
				draggable: null,
				dragging: false,
			}
			tileArray.push(newTile)
		}
		setInitialTiles(tileArray)
	}

	useEffect(() => {
		if (gameSize) createInitialTiles()
		// if (gameSize) setGameStatus('idle')
	}, [gameSize])

	const handleWin = () => {
		// console.log('handleWin', gameStatus)
		if (gameStatus === 'playing') setGameStatus('resolved')
	}

	return (
		<View style={{ flex: 1, justifyContent: 'flex-start', gap: 10 }}>
			
			<GameHeader
				status={gameStatus}
				onChangeStatus={setGameStatus}
			/>

			<View onLayout={onLayout}>

				{(initialTiles.length > 0) && (
					<TileGame
						initialTiles={initialTiles}
						size={gameSize}
						status={gameStatus}
						handleWin={handleWin}
					/>
				)}

			</View>

		</View>
	)
}

const TileGame = ({ initialTiles, size, status, handleWin, level = 4  }) => {

	const initialEmpty = { col: level - 1, row: level - 1 }
	const [itemSize, setItemSize] = useState(size / level)
	const [tiles, setTiles] = useState(initialTiles)
	const [empty, setEmpty] = useState(initialEmpty)
	const [refreshing, setRefreshing] = useState(false)
	const [isPaused, setIsPaused] = useState(false)

	useEffect(() => {
		// console.log('status', status)
		switch (status) {
			case 'start':
				if (isPaused) setIsPaused(false)
				setEmpty(initialEmpty)
				setTiles(initialTiles)
				break
			case 'playing':
				if (isPaused) setIsPaused(false)
				else startGame()
				break
			case 'paused':
				setIsPaused(true)
				break
			case 'resolved':
				setEmpty(initialEmpty)
				setTiles(initialTiles.map(t => ({ ...t, draggable: null })))
				break
			default:
		}
	}, [status])
	
	const startGame = () => {
		setEmpty(initialEmpty)
        shuffleTiles(initialTiles, true)
	}
	
	const offsetX = useSharedValue(0)
	const offsetY = useSharedValue(0)

	const resetOffsetValues = () => {
		offsetX.value = 0
		offsetY.value = 0
	}

	const setDraggableTiles = draggableTiles => {
		const updatedTiles = draggableTiles.map(t => {
			const draggable = getDirectionToEmpty(t)
			return {
				...t,
				draggable,
				dragging: false,
			}
		})
		setTiles(updatedTiles)
	}

	useEffect(() => {
		
		const isCorrect = resolveTiles(tiles)
		// console.log('isCorrect', isCorrect)
		if (status === 'playing' && isCorrect) {
			console.log('WINNER WINNER CHICKEN DINNER')
			handleWin()
		}
		
		if (refreshing) {
			setRefreshing(false)
			setDraggableTiles(tiles)
		}
	}, [tiles])

	const getDirectionToEmpty = (tile, nextEmpty = null) => {
		const { col, row } = tile
		let emptyPos = nextEmpty || empty
		let direction = null
		if (col === emptyPos.col || row === emptyPos.row) {
			const isVertical = col === emptyPos.col
			if (isVertical) {
				direction = (row < emptyPos.row) ? 'down' : 'up'
			} else {
				direction = (col < emptyPos.col) ? 'right' : 'left'
			}
		}
		return direction
	}

	const dragTilesInDirection = tile => {
		const { row, col } = tile
		let updatedTiles = tiles.map(t => {
			let dragging = false
			const dir = getDirectionToEmpty(t)
			if (t.id === tile.id) {
				dragging = true
			} else if (t.col === empty.col || t.row === empty.row) {
				switch (dir) {
					case 'up':
						if (t.row > empty.row && t.row < row) dragging = true
						break
					case 'down':
						if (t.row < empty.row && t.row > row) dragging = true
						break
					case 'left':
						if (t.col > empty.col && t.col < col) dragging = true
						break
					case 'right':
						if (t.col < empty.col && t.col > col) dragging = true
						break
					default:
				}
			}
			return {
				...t,
				dragging,
			}
		})
		return updatedTiles
	}

	const shuffleTiles = (tileArray = null, dev = false) => {
		let tilesToShuffle = tileArray || tiles
		let shuffled = []
		if (dev) {
			let nextEmpty = {
				...empty,
				col: empty.col - 1,
			}
			shuffled = tilesToShuffle.map(t => {
				let newTile = t
				if (t.col === 2 && t.row === 3) {
					newTile = {
						...newTile,
						col: 3,
					}
				}
				
				// const draggable = getDirectionToEmpty(newTile, nextEmpty)
				// newTile.draggable = draggable
				return newTile
			})
			setEmpty(nextEmpty)
		} else {
			let pile = tilesToShuffle.slice()
			let col = 0
			let row = 0
			while (pile.length > 0) {
				const index = Math.floor(Math.random() * pile.length)
				const tile = pile.splice(index, 1)[0]
				let shuffledTile = {
					...tile,
					col,
					row,
				}
				
				if (col + 1 < level) {
					col++
				} else if (row + 1 < level) {
					col = 0
					row++
				}
				// shuffledTile.draggable = draggable
	
				shuffled.push(shuffledTile)
			}
		}
		setRefreshing(true)
		setTiles(shuffled)
    }

	const onTouchStart = (event, tile) => {
		const updatedTiles = dragTilesInDirection(tile)
		setTiles(updatedTiles)
	}

	const onTouchMove = (event, tile) => {
		const { translationX, translationY } = event
		switch (tile.draggable) {
			case 'up':
				if (translationY >= -itemSize && translationY <= 0) offsetY.value = translationY//changeY//
				break
			case 'down':
				if (translationY <= itemSize && translationY >= 0) offsetY.value = translationY//changeY//
				break
			case 'left':
				if (translationX >= -itemSize && translationX <= 0) offsetX.value = translationX//changeX//
				break
			case 'right':
				if (translationX <= itemSize && translationX >= 0) offsetX.value = translationX//changeX//
				break
			default:
		}
	}

	const getSwipeEvent = event => {
		const { velocityX, velocityY } = event
		let swipeX = false
		let swipeY = false
		if (velocityY > 1000) swipeY = true
		else if (velocityX > 1000) swipeX = true
		if (swipeX) return 'horizontal'
		else if (swipeY) return 'vertical'
		else return null
	}

	const shouldFinishMove = (event, tile) => {
		const { translationX, translationY } = event
		const swipe = getSwipeEvent(event)
		const moveThreshold = itemSize / 2
		const moveY = Math.abs(translationY) > moveThreshold
		const moveX = Math.abs(translationX) > moveThreshold
		if (swipe) {
			if (swipe === 'horizontal' && moveX) return true
			else if (swipe === 'vertical' && moveY) return true
		}
		const isVertical = (tile.draggable === 'up' || tile.draggable === 'down')
		return ((!isVertical && moveX) || (isVertical && moveY))
	}

	const onTouchEnd = (event, tile) => {
		let finishMove = shouldFinishMove(event, tile)
		if (finishMove) {
			handleFinishMove(tile)
		} else {
			setRefreshing(true)
			setTiles(updatedTiles)
		}
		resetOffsetValues()
	}
	
	const handleFinishMove = tile => {
		const nextEmptyPos = { col: tile.col, row: tile.row }
		const updatedTiles = tiles.map(t => {
			let newTile = { ...t }
			if (newTile.dragging) {
				if (t.draggable === 'up' || t.draggable === 'down') {
					newTile.row = t.draggable === 'up'
						? t.row - 1
						: t.row + 1
				} else {
					newTile.col = t.draggable === 'left'
						? t.col - 1
						: t.col + 1
				}
			}
			const direction = getDirectionToEmpty(newTile, nextEmptyPos)
			newTile.draggable = direction
			newTile.dragging = false
			return newTile
		})
		setEmpty(nextEmptyPos)
		setRefreshing(true)
		setTiles(updatedTiles)
	}

	const getTileByColRow = (tilesToSort, col, row) => {
		return tilesToSort.filter(t => t.col === col && t.row === row)[0]
	}
	
	const resolveTiles = tileArray => {

		let numCorrect = 0
		let row = 0
		let col = 0
		let sorting = true
		let isCorrect = false

		while (sorting) {
			const tile = getTileByColRow(tileArray, col, row)
			if (tile && tile.id === numCorrect) {
				numCorrect++
				// console.log(tile.id, tile.col, tile.row)
				if (numCorrect === tileArray.length) {
					isCorrect = true
				} else {
					if (col + 1 < level) {
						col++
					} else if (row + 1 < level) {
						col = 0
						row++
					}
				}
			} else {
				sorting = false
			}
		}
		
		// console.log('tiles.resolved', isCorrect)
		return isCorrect
	}

	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: offsetX.value },
				{ translateY: offsetY.value },
				// { scale: withTiming(pressed.value ? 1.2 : 1) },
			],
			backgroundColor: 'red',
		}
	})

	return (
		<GestureHandlerRootView>
			{/* {tiles.length && ( */}
			{true && (
				<View
					style={{
						width: itemSize,
						height: itemSize,
						position: 'relative',
					}}
				>
					{!refreshing && tiles.map(t => {

						if (t.draggable) {

							const pan = Gesture.Pan()
								.runOnJS(true)
								.onBegin(e => onTouchStart(e, t))
								.onChange(e => onTouchMove(e, t))
								.onFinalize(e => onTouchEnd(e, t))

							return (
								<AnimatedView
									key={`tile-${t.id}`}
									tile={t}
									size={itemSize}
									pan={pan}
									style={animatedStyles}
								/>
							)
						} else {
							return (
								<Tile
									key={`tile-${t.id}`}
									label={`${t.id + 1}`}
									size={itemSize}
									style={{
										top: t.row * itemSize,
										left: t.col * itemSize,
										cursor: 'default',
										backgroundColor: getModifiedColor('#b58df1', 25),
									}}
								/>
							)
						}
					})}
				</View>
			)}
		</GestureHandlerRootView>
	)
}


const AnimatedView = ({ tile, size, pan, style, ...props }) => {
	
	return (
		<Animated.View
			{...props}
			style={[
				{
					position: 'absolute',
					top: tile.row * size,
					left: tile.col * size,
					height: size,
					width: size,
					overflow: 'hidden',
					borderRadius: 8,
					backgroundColor: tile.dragging ? 'purple' : '#b58df1',//getModifiedColor('#b58df1', 25),
					cursor: 'pointer',
				},
				tile.dragging ? style : {},
			]}
		>
			<GestureDetector gesture={pan}>
				<SquareWithLabel label={tile.id + 1} size={size} />
			</GestureDetector>
		</Animated.View>
	)
}