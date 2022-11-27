import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import Axios from 'axios'
import Constants from './Constants.json'
import './Feed.css'
import images from './Images.js'
import Vinyl from './Vinyl'
import Popup from './Popup'
import CloseIcon from '@mui/icons-material/Close'
import Carousel, {CarouselItem} from './Carousel'

function Feed() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [isOpen, setIsOpen] = useState(true)
  const togglePopup = () => setIsOpen(!isOpen)

  const getLocalData = () => {
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

  const getVinylData = async () => {
    Axios.get(Constants.API_ADDRESS + '/').then(
      (response) => {
        console.log(response)
        //setRecord(response.data)
      }
    )
  }

  useEffect(() => {
    getLocalData()
    getVinylData()
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
        {/* <div className='carousel-header'>
          Check out the latest releases
        </div> */}
        <div className='carousel-container'>
          <Carousel>
            {data && data.length > 0 &&
            data.map((item) => {
              return (
                <CarouselItem key={item.id}>
                  <div className='carousel-item-details1'>
                    <div className='carousel-item-name'>{item.name}</div>
                    <div className='carousel-item-artist'>by  {item.artist}</div>
                    <div className='carousel-item-genre'>Genre: {item.genre}</div>
                    <div className='carousel-item-released'>Released: {item.released}</div>
                    <div className='carousel-item-released'>Length: {item.length}</div>
                    <div className='carousel-item-released'>Producer: {item.producer}</div>
                    <div className='carousel-item-released'>Label: {item.label}</div>
                  </div>
                  <img className='carousel-item-image' src={ChooseImage(item.id)} alt='album-cover'/>
                  <div className='carousel-item-details2'>
                    <div className='carousel-item-name'>{item.name}</div>
                    <div className='carousel-item-artist'>by  {item.artist}</div>
                    <div className='carousel-item-genre'>Genre: {item.genre}</div>
                    <div className='carousel-item-released'>Released: {item.released}</div>
                    <div className='carousel-item-released'>Length: {item.length}</div>
                    <div className='carousel-item-released'>Producer: {item.producer}</div>
                    <div className='carousel-item-released'>Label: {item.label}</div>
                  </div>
                </CarouselItem>
              )
            })
            }
          </Carousel>
        </div>
        <Vinyl />
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
                <div className='item-released'>Length: {item.length}</div>
                <div className='item-released'>Producer: {item.producer}</div>
                <div className='item-released'>Label: {item.label}</div>
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