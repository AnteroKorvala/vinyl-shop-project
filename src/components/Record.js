import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"
import Axios from 'axios'
import Constants from './Constants.json'

function Record() {
  const [record, setRecord] = useState()
  let {id} = useParams()

  useEffect(() => {
    Axios.get(Constants.API_ADDRESS + `/record/${id}`).then(
      (response) => {
        console.log(response.data)
        setRecord(response.data)
      }
    )
  }, [id])

  return (
    <div>
      {record && record.map((item) =>{
        return (
          <div key={item.id}>
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
  )
}

export default Record