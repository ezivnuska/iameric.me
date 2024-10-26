import 'react-native-gesture-handler'
import React, { useEffect, useMemo, useState } from 'react'
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
import { useApp } from '@app'
import { PlayContextProvider, usePlay } from '@play'

export default ({ gameSize }) => {

	const [level, setLevel] = useState(4)
	const {
		// gameSize,
		// initialTiles,
		// setGameSize,
		tiles,
		setTiles,
	} = usePlay()
	
	const [initialTiles, setInitialTiles] = useState(null)
	const [currentTiles, setCurrentTiles] = useState(tiles || initialTiles)
	const [gameStatus, setGameStatus] = useState('start')

	useEffect(() => {
		if (currentTiles) setTiles(currentTiles)
	}, [currentTiles])

	useEffect(() => {
		if (initialTiles) setTiles(initialTiles)
	}, [initialTiles])

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

	// const onLayout = e => {
	// 	if (e.nativeEvent.target.offsetParent) {
	// 		setGameSize(e.nativeEvent.target.offsetParent.clientWidth)
	// 	}
	// }

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

			{initialTiles && (
				<TileGame
					initialTiles={initialTiles}
					// tiles={tiles}
					status={gameStatus}
					handleWin={handleWin}
					gameSize={gameSize}
				/>
			)}

		</View>
	)
}

const TileGame = ({ gameSize, initialTiles, status, handleWin, level = 4  }) => {

	const {
		// gameSize,
		// initialTiles,
		ticks,
		tiles,
		setTiles,
	} = usePlay()
	
	const itemSize = gameSize / level
	const initialEmptyCol = level - 1
	const initialEmptyRow = level - 1

	const [emptyCol, setEmptyCol] = useState(initialEmptyCol)
	const [emptyRow, setEmptyRow] = useState(initialEmptyRow)
	const [refreshing, setRefreshing] = useState(false)
	const [isPaused, setIsPaused] = useState(false)

	useEffect(() => {
		// console.log('status', status)
		switch (status) {
			case 'start':
				if (isPaused) setIsPaused(false)
				setEmptyCol(initialEmptyCol)
				setEmptyRow(initialEmptyRow)
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
				setEmptyCol(initialEmptyCol)
				setEmptyRow(initialEmptyRow)
				setTiles(initialTiles.map(t => ({ ...t, dragging: false, draggable: null })))
				break
			default:
		}
	}, [status])
	
	const startGame = () => {
		setEmptyCol(initialEmptyCol)
		setEmptyRow(initialEmptyRow)
        shuffleTiles(initialTiles)
	}
	
	const offsetX = useSharedValue(0)
	const offsetY = useSharedValue(0)

	const resetOffsetValues = () => {
		offsetX.value = 0
		offsetY.value = 0
	}

	const setDraggableTiles = () => {
		const updatedTiles = tiles.map(t => {
			const draggable = getDirection(t)
			return {
				...t,
				draggable,
				dragging: false,
			}
		})
		setTiles(updatedTiles)
	}

	useEffect(() => {
		setTiles(initialTiles)
	}, [])

	useEffect(() => {
		// console.log('tiles changed', tiles)
		if (refreshing) setRefreshing(false)
		if (status === 'playing') {
			const isCorrect = resolveTiles(tiles)
			// console.log('isCorrect', isCorrect)
			if (isCorrect) {
				console.log('WINNER WINNER CHICKEN DINNER')
				handleWin()
			}
		}
	}, [tiles])

	const getDirection = tile => {
		let direction = null
		
		if (tile.col === emptyCol) {
			direction = (tile.row < emptyRow) ? 'down' : 'up'
		} else if (tile.row === emptyRow) {
			direction = (tile.col < emptyCol) ? 'right' : 'left'
		}
		return direction
	}

	const getDirectionToNextEmpty = (tile, nextEmpty) => {

		let direction = null
		
		if (tile.col === nextEmpty.col) {
			direction = (tile.row < nextEmpty.row) ? 'down' : 'up'
		} else if (tile.row === nextEmpty.row) {
			direction = (tile.col < nextEmpty.col) ? 'right' : 'left'
		}
		return direction
	}

	const setDraggingTiles = (tile = null) => {
		if (!tile) return setTiles(tiles.map(t => ({ ...t, dragging: false })))

		const { row, col } = tile
		let updatedTiles = tiles.map(t => {
			let dragging = false
			if (t.id === tile.id) {
				dragging = true
			} else if (t.col === emptyCol || t.row === emptyRow) {
				const draggable = getDirection(t)
				switch (draggable) {
					case 'up':
						if (t.row > emptyRow && t.row < row) dragging = true
						break
					case 'down':
						if (t.row < emptyRow && t.row > row) dragging = true
						break
					case 'left':
						if (t.col > emptyCol && t.col < col) dragging = true
						break
					case 'right':
						if (t.col < emptyCol && t.col > col) dragging = true
						break
					default:
				}
			}

			// if (dragging) console.log(t.id + 1, dragging)
			return {
				...t,
				dragging,
			}
		})
		setTiles(updatedTiles)
	}

	const shuffleForDev = tilesToShuffle => {

		const nextEmpty = {
			row: emptyRow,
			col: emptyCol - 1,
		}

		const shuffled = tilesToShuffle.map(t => {
			let newTile = t
			if (t.col === 2 && t.row === 3) {
				newTile = {
					...newTile,
					col: 3,
				}
			}
			
			const draggable = getDirectionToNextEmpty(newTile, nextEmpty)
			newTile.draggable = draggable
			return newTile
		})

		setEmptyCol(nextEmpty.col)
		return shuffled
	}

	const shuffleTiles = (tileArray = null, dev = false) => {
		let tilesToShuffle = tileArray || tiles
		let shuffled = []
		if (dev) {
			shuffled = shuffleForDev(tilesToShuffle)
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
				const draggable = getDirection(shuffledTile)
				shuffledTile.draggable = draggable
				shuffledTile.dragging = false
	
				shuffled.push(shuffledTile)
			}
		}
		setTiles(shuffled)
    }

	const onTouchStart = tile => {
		if (tile.draggable) {
			setDraggingTiles(tile)
		}
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
		// console.log('finishing move', finishMove)
		if (finishMove) {
			handleFinishMove(tile)
		} else {
			// setRefreshing(true)
			setDraggingTiles()

			// setTiles(tiles.map(t => ({ ...t, dragging: false })))
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

			const direction = getDirectionToNextEmpty(newTile, nextEmptyPos)
			
			newTile.draggable = direction
			newTile.dragging = false
			
			return newTile
		})

		setEmptyRow(tile.row)
		setEmptyCol(tile.col)
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
		}
	})

	const renderTiles = tiles => {
		return tiles.map(t => {

			const pan = Gesture.Pan()
				.runOnJS(true)
				.onBegin(() => onTouchStart(t))
				.onChange(e => onTouchMove(e, t))
				.onFinalize(e => onTouchEnd(e, t))

			return (
				<AnimatedView
					key={`tile-${t.id}`}
					tile={t}
					size={itemSize}
					pan={pan}
					style={t.dragging ? animatedStyles : {}}
				/>
			)
		})
	}

	return (
		<GestureHandlerRootView>
			<View
				style={{
					width: gameSize,
					height: gameSize,
					position: 'relative',
				}}
			>
				{!refreshing && renderTiles(tiles)}
			</View>
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
					cursor: tile.draggable ? 'pointer' : tile.dragging ? 'grab' : 'default',
				},
				style,
			]}
		>
			<GestureDetector gesture={pan}>
				<Tile
					label={tile.id + 1}
					size={size}
					dragging={tile.dragging}
					draggable={tile.draggable}
				/>
			</GestureDetector>
			
		</Animated.View>
	)
}