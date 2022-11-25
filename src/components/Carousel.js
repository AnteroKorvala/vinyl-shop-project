import React, { Children, cloneElement, useEffect, useState } from 'react'
import "./Carousel.css"

export const CarouselItem = ({ children, width }) => {
    return (
        <div className='carousel-item' style={{ width: width }}>
            {children}
        </div>
    )
}

const Carousel = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [paused, setPaused] = useState(false)

    const updateIndex = (newIndex) => {
        if(newIndex < 0) newIndex = Children.count(children) - 1
        else if(newIndex >= Children.count(children)) newIndex = 0
        setActiveIndex(newIndex)
    }

useEffect(() => {
    const interval = setInterval(() => {
        if(!paused) updateIndex(activeIndex + 1)
    }, 1500)

    return () => clearInterval(interval)
})

  return (
    <div
        className='carousel'
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
    >
        <div
            className='inner'
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
            {Children.map(children, (child, index) => {
                return cloneElement(child, {width: "100%"})
            })}
        </div>
        <div className='indicators'>
            <button
                onClick={() => {updateIndex(activeIndex - 1)}}
            >
                Prev
            </button>
            {Children.map(children, (child, index) => {
                return (
                    <button
                        className={`${index === activeIndex ? "active" : ""}`}
                        onClick={() => {
                            updateIndex(index)
                        }}
                    >
                        {index + 1}
                    </button>
                )
            })}
            <button
                onClick={() => {updateIndex(activeIndex + 1)}}
            >
                Next
            </button>
        </div>
    </div>
  )
}

export default Carousel