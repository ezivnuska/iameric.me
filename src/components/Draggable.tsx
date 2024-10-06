import React, { useRef, useState } from 'react'
import {
    View,
} from 'react-native'

export default ({ children }) => {
    const ourRef = useRef(null)
    const [isMouseDown, setIsMouseDown] = useState(false)
    const mouseCoords = useRef({
        startX: 0,
        startY: 0,
        posX: 0,
        posY: 0,
    })
    
    const handleDragStart = (e) => {
        if (!ourRef.current) return
        const slider = ourRef.current.children[0]
        const startX = e.pageX - slider.offsetLeft
        const startY = e.pageY - slider.offsetTop
        mouseCoords.current = { ...mouseCoords.current, startX, startY }
        setIsMouseDown(true)
        document.body.style.cursor = 'grabbing'
    }

    const handleDragEnd = () => {
        setIsMouseDown(false)
        if (!ourRef.current) return
        document.body.style.cursor = 'default'
    }

    const handleDrag = (e) => {
        if (!isMouseDown || ! ourRef.current) return
        e.preventDefault()
        const slider = ourRef.current.children[0]
        const x = e.pageX - slider.offsetLeft
        const y = e.pageY - slider.offsetTop
        const posX = (x - mouseCoords.current.startX)
        const posY = (y - mouseCoords.current.startY)
        mouseCoords.current = {
            ...mouseCoords.current,
            posX,
            posY,
        }
        // slider.scrollLeft = mouseCoords.current.scrollLeft - walkX
        // slider.scrollTop = mouseCoords.current.scrollTop - walkY
    }
  
    return (
        <View
            ref={ourRef}
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onMouseMove={handleDrag}
            // className={rootClass + 'flex overflow-x-scroll'}
            style={{
                flexBasis: 'auto',
                position: 'absolute',
                top: mouseCoords.current.posY,
                left: mouseCoords.current.posX,
            }}
        >
            {children}
        </View>
    )
}