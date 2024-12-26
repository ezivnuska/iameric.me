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
} from './components'
import { useApp, usePlay, useUser } from '@context'

const Tiles = ({ gameSize }) => {

	const { landscape } = useApp()
	const { playModal, closePlayModal, setPlayModal } = usePlay()
	const [level, setLevel] = useState(4)
	
	const [initialTiles, setInitialTiles] = useState(null)
	const [gameStatus, setGameStatus] = useState('idle')

	const createInitialTiles = async () => {
		const tileArray = []
		while (tileArray.length < level * level - 1) {
			const col = tileArray.length % level
			const row = Math.floor(tileArray.length / level)
			let newTile = {
				id: tileArray.length,
				col,
				row,
				direction: null,
				dragging: false,
			}
			tileArray.push(newTile)
		}
		setInitialTiles(tileArray)
	}

	useEffect(() => {
		if (gameSize) {
			if (!initialTiles) {
				createInitialTiles()
			}
		}
		// if (landscape) setPlayModal('PAUSED')
	}, [gameSize])

	useEffect(() => {
		if (landscape && (gameStatus === 'playing')) setGameStatus('paused')
		else if (!landscape && playModal) closePlayModal()
	}, [landscape, gameStatus])

	useEffect(() => {
		if (gameStatus == 'paused' && landscape && !playModal) setPlayModal('PAUSED')
	}, [gameStatus])

	const handleWin = () => {
		setGameStatus('resolved')
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
					onChangeStatus={setGameStatus}
					status={gameStatus}
					handleWin={handleWin}
					gameSize={gameSize}
				/>
			)}

		</View>
	)
}

const TileGame = ({ gameSize, initialTiles, status, onChangeStatus, handleWin, level = 4  }) => {

	const {
		tiles,
		setTiles,
	} = usePlay()
	const { user } = useUser()
	
	const itemSize = gameSize / level

	const [isPaused, setIsPaused] = useState(false)
	const [refreshing, setRefreshing] = useState(false)
	const [isDragging, setIsDragging] = useState(false)

	useEffect(() => {
		
		switch (status) {
			case 'idle':
				setTiles(initialTiles)
				break
			case 'start':
				startGame()
				break
			case 'playing':
				if (isPaused) setIsPaused(false)
				break
			case 'paused':
				setIsPaused(true)
				break
			case 'resolved':
				setTiles(initialTiles)
				break
			default:
		}
	}, [status])
	
	const startGame = () => {
		setRefreshing(true)
		
		let shuffledTiles

		if (user?.role === 'admin') shuffledTiles = shuffleForDev()
		else shuffledTiles = shuffle()

		setTiles(shuffledTiles)

		onChangeStatus('playing')
	}

	const shuffleForDev = () => {
		return tiles.map(t => {
			let newTile = t
			if (t.col === 2 && t.row === 3) {
				newTile = {
					...newTile,
					col: 3,
				}
			}
			return newTile
		})
	}

	const shuffle = () => {
		
		let pile = tiles.slice()
		let col = 0
		let row = 0
		let shuffled = []

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
			const direction = getDirection(shuffledTile)
			shuffledTile.direction = direction
			shuffled.push(shuffledTile)
		}
		
		return shuffled
    }
	
	const offsetX = useSharedValue(0)
	const offsetY = useSharedValue(0)

	const resetOffsetValues = () => {
		offsetX.value = 0
		offsetY.value = 0
	}

	const emptyRow = useMemo(() => {
		if (!tiles || !tiles.length) return
		let rows = []
		while (rows.length < level) {
			rows.push(tiles.filter(t => t.row === rows.length))
		}
		let index = level
		rows.map((r, i) => {
			if (r.length < index) index = i
		})
		
		return index
	}, [tiles])

	const emptyCol = useMemo(() => {
		if (!tiles || !tiles.length) return
		let cols = []
		while (cols.length < level) {
			cols.push(tiles.filter(t => t.col === cols.length))
		}
		let index = level
		cols.map((c, i) => {
			if (c.length < index) index = i
		})
		
		return index
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

	useEffect(() => {
		if (refreshing) {
			setRefreshing(false)
			if (tiles && tiles.length) {
				if (status === 'playing') {
					const isCorrect = resolveTiles()
					if (isCorrect) {
						console.log('WINNER WINNER CHICKEN DINNER')
						handleWin()
					} else {
						const updatedTiles = tiles.map(t => {
							const direction = getDirection(t)
							return {
								...t,
								direction,
								dragging: false,
							}
						})
						
						setTiles(updatedTiles)
					}
				}
			}
		}
		
	}, [tiles])

	const setDraggedTiles = tile => {
		
		const { row, col, direction } = tile

		let draggingTiles = tiles.map(t => {
			
			let dragging = false

			if (t.id === tile.id) {
				dragging = true
			} else if (t.col === emptyCol || t.row === emptyRow) {
				switch (direction) {
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

			return {
				...t,
				dragging,
			}
		})
		
		setTiles(draggingTiles)
	}

	const onTouchStart = tile => {
		if (status !== 'playing') return
		if (tile.direction) {
			setIsDragging(true)
			setDraggedTiles(tile)
		}
	}

	const onTouchMove = (event, tile) => {
		if (!isPaused && isDragging) {
			const { translationX, translationY } = event
			switch (tile.direction) {
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
		const isVertical = (tile.direction === 'up' || tile.direction === 'down')
		return ((!isVertical && moveX) || (isVertical && moveY))
	}

	const onTouchEnd = (event, tile) => {
		if (!isPaused && isDragging) {
			setIsDragging(false)
			let finishMove = shouldFinishMove(event, tile)
			setRefreshing(true)
			if (finishMove) {
				const movedTiles = moveTiles(tile.direction)
				setTiles(movedTiles)
			} else {
				setTiles(tiles.map(t => ({ ...t, dragging: false })))
			}
			resetOffsetValues()
		}
	}

	const moveTilesVertically = direction => {
		return tiles.map(t => {
			let newRow = t.row
			if (t.dragging) {
				newRow = direction === 'up' ? t.row - 1 : t.row + 1
			}
			return {
				...t,
				row: newRow,
				dragging: false,
			}
		})
	}

	const moveTilesHorizontally = direction => {
		return tiles.map(t => {
			let newCol = t.col
			if (t.dragging) {
				newCol = direction === 'left' ? t.col - 1 : t.col + 1
			}
			return {
				...t,
				col: newCol,
				dragging: false,
			}
		})
	}

	const moveTiles = direction => {

		let movedTiles = tiles

		switch (direction) {
			case 'up':
			case 'down':
				movedTiles = moveTilesVertically(direction)
				break
			case 'left':
			case 'right':
				movedTiles = moveTilesHorizontally(direction)
				break
			default:
		}
		return movedTiles
	}
	
	const resolveTiles = () => {

		let numCorrect = 0
		let row = 0
		let col = 0
		let sorting = true
		let isCorrect = false

		while (sorting) {
			const tile = tiles.filter(t => t.col === col && t.row === row)[0]
			if (tile && tile.id === numCorrect) {
				numCorrect++
				if (numCorrect === tiles.length) {
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
		
		return isCorrect
	}

	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: offsetX.value },
				{ translateY: offsetY.value },
			],
		}
	})

	const renderTiles = () => {
		
		return tiles.map(t => {

			const pan = Gesture.Pan()
				.runOnJS(true)
				.onBegin(() => onTouchStart(t))
				.onChange(e => onTouchMove(e, t))
				.onFinalize(e => onTouchEnd(e, t))
			
			return (
				<Animated.View
					key={`tile-${t.id}`}
					// {...props}
					style={[
						{
							position: 'absolute',
							top: t.row * itemSize,
							left: t.col * itemSize,
							height: itemSize,
							width: itemSize,
							cursor: t.direction ? 'pointer' : t.dragging ? 'grab' : 'default',
						},
						// props.style,
						t.dragging ? animatedStyles : null,
					]}
				>
					<GestureDetector gesture={pan}>
						<Tile
							label={t.id + 1}
							size={itemSize}
							dragging={t.dragging}
							direction={t.direction}
							style={{
								backgroundColor: 
									status === 'resolved'
										? 'purple'
										: t.direction
											? 'green'
											: t.dragging
												? 'red'
												: 'blue',
							}}
						/>
					</GestureDetector>
					
				</Animated.View>
			)
			// return (
			// 	<AnimatedView
			// 		key={`tile-${t.id}`}
			// 		tile={t}
			// 		size={itemSize}
			// 		pan={pan}
			// 		animatedStyle={t.dragging ? animatedStyles : {}}
			// 	/>
			// )
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
				{!refreshing && renderTiles()}
			</View>
		</GestureHandlerRootView>
	)
}

// const AnimatedView = ({ tile, size, pan, animatedStyle, ...props }) => {

	
// 	const colorBase = '#ff0000'
// 	const colors = {
// 		dragged: getModifiedColor(colorBase, 50),
// 		enabled: getModifiedColor(colorBase, 25),
// 	}

// 	const backgroundColor = tile.dragging
// 		? colors.dragged
// 		: tile.direction
// 			? colors.enabled
// 			: colorBase
	
// 	return (
// 		<Animated.View
// 			{...props}
// 			style={[
// 				{
// 					position: 'absolute',
// 					top: tile.row * size,
// 					left: tile.col * size,
// 					height: size,
// 					width: size,
// 					cursor: tile.direction ? 'pointer' : tile.dragging ? 'grab' : 'default',
// 				},
// 				// props.style,
// 				animatedStyle,
// 			]}
// 		>
// 			<GestureDetector gesture={pan}>
// 				<Tile
// 					label={tile.id + 1}
// 					size={size}
// 					dragging={tile.dragging}
// 					direction={tile.direction}
// 					style={{ backgroundColor }}
// 				/>
// 			</GestureDetector>
			
// 		</Animated.View>
// 	)
// }

export default Tiles