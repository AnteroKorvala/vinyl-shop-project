import React, { useState, useEffect } from 'react'

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
        console.log(myJson)
        setData(myJson)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>{data}</div>
  )
}

export default Feed