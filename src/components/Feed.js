import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import './Feed.css'
import images from './Images.js'
import Vinyl from './Vinyl'

/*
TODO
Enhance background colors
Create carousel component
*/

function Feed() {
  const navigate = useNavigate()
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

  function ChooseImage(id) {
    console.log(images)
    console.log(id)
    return images[id]
  }

  return (
    <div className='feed-container'>
      <div className='feed'>
        {data && data.length > 0 &&
        data.map((item) => {
          return (
            <div
              key={item.id}
              className='item-container'
              onClick={() => {
                navigate(`/recordID/${item.id}`)
              }}
            >
              <img className='item-image' src={ChooseImage(item.id)} alt='album-cover' />
              <div className='item-name'>{item.name}</div>
              <div className='item-artist'>by  {item.artist}</div>
              <div className='item-genre'>Genre: {item.genre}</div>
              <div className='item-released'>{item.released}</div>
            </div>
          )
        })}
      </div>
      <Vinyl />
    </div>
  )
}

export default Feed