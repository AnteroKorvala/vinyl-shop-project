import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import './Feed.css'
import images from './Images.js'
import Vinyl from './Vinyl'
import Popup from './Popup'
import CloseIcon from '@mui/icons-material/Close'
import Carousel, {CarouselItem} from './Carousel'

/*
TODO
Enhance background colors
Create carousel component
*/

function Feed() {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [isOpen, setIsOpen] = useState(true)
  const togglePopup = () => setIsOpen(!isOpen)

  const getData = () => {
    fetch('./data.json',
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(function(response){
        return response.json()
      })
      .then(function(myJson){
        setData(myJson.records)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  function ChooseImage(id) {
    return images[id]
  }

  return (
    <div className='feed-container'>
      <div className='feed'>
        {isOpen && <div className='popup'>
          <Popup
            content = {<>
              <div className='popup-text'>
                Scroll down on albums<br />
                to see extra details!<br />
              </div>
              {<CloseIcon className='popup-close' onClick = {togglePopup} />}
            </>}
          />
        </div>}
        {/* <div className='carousel'>
          <Carousel>
            {data && data.length > 0 &&
            data.map((item) => {
              return (
                <CarouselItem>
                  <img className='item-image-carousel' src={ChooseImage(item.id)} alt='album-cover'/>
                </CarouselItem>
              )
            })
            }
          </Carousel>
        </div> */}
        <div className='all-albums-container'>
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
                <div className='item-released'>Released: {item.released}</div>
              </div>
            )
          })}
        </div>
        <Vinyl />
      </div>
    </div>
  )
}

export default Feed