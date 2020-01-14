import React, { useState, useEffect, useCallback } from "react";
import Board from './components/board'

import initializeDeck from './deck'


export default function App() {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [dimension, setDimension] = useState(400)
  const [solved, setSolved] = useState([])
  const [disabled, setDisabled] = useState(false)
  const preloadImages = (() => {
    cards.map((card) => {
      const src = `/img/${card.type}.png`
      new Image().src = src
    })
  
  })





  const handleClick = (id) => {
    setDisabled(true)
    if (flipped.length === 0) {
      setFlipped([id])
      setDisabled(false)
    } else {
      if (sameCardClicked(id)) return
      setFlipped([...flipped[0], id])
      if (isMatch(id)) {
        setSolved([...solved, flipped[0], id])
        resetCards()
      } else {
        setTimeout(resetCards, 2000)
      }
    }

  }

  

  const resetCards = () => {
    setFlipped([])
    setDisabled(false)
  }

  const sameCardClicked = (id) => flipped.includes(id)

  const isMatch = (id) => {
    const clickedCard = cards.find((card) => card.id === id)
    const flippedCard = cards.find((card) => flipped[0] === card.id)
    return flippedCard.type === clickedCard.type
  }

  const resizeBoard = () => {
    setDimension(Math.min(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    ))
  }

  const myCallback = useCallback((preloadImages), [preloadImages]);

  useEffect(() => {
    resizeBoard()
    setCards(initializeDeck())
    preloadImages()
  }, [myCallback])

  useEffect(() => {
    preloadImages()
  }, [myCallback])

  useEffect(() => {
    const resizeListener = window.addEventListener('resize', resizeBoard)

    return () => window.removeEventListener('resize', resizeListener)
  })

  return (
    <div>
      <h2>Can you remember and match every card?</h2>
      <Board
        dimension={dimension}
        cards={cards}
        flipped={flipped}
        handleClick={handleClick}
        disabled={disabled}
        solved={solved}
      />
    </div>
  )
}