import React, { useState, useEffect } from 'react'
import './Feed.css'
import belowtheheavens from './images/belowtheheavens.png'
import numberofthebeast from './images/numberofthebeast.png'
import antichristsuperstar from './images/antichristsuperstar.png'
import czarmageddon from './images/czarmageddon.png'

function Feed() {
  const [data, setData] = useState([])

  const getData = () => {
    fetch('./data.json',
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(function(response){
        console.log(response)
        return response.json()
      })
      .then(function(myJson){
        console.log(myJson.records)
        setData(myJson.records)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
    <div className='feed'>
      {data && data.length > 0 &&
      data.map((item) => {
        return (
          <div key={item.id} className='item-container'>
            <img className='item-image' src={item.image.split("")} alt='bth' />
            <div className='item-name'>{item.name}</div>
            <div className='item-artist'>{item.artist}</div>
            <div className='item-genre'>{item.genre}</div>
            <div className='item-released'>{item.released}</div>
            <div className='item-length'>{item.length}</div>
            <div className='item-producer'>{item.producer}</div>
          </div>
        )
      })}
    </div>
    </>
  )
}

export default Feed