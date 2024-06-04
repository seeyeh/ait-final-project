import React, {useEffect, useState} from 'react'

function App() {

  const [backendData, setBackendData] = useState([{}]);

  useEffect(()=> {
    fetch("/test").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data);
      }
    )
  }, [])

  return (
    <div>
      {(typeof backendData.testing === 'undefined') ? (<p>Loading...</p>) : (
        JSON.stringify(backendData))}
    </div>
  )
}

export default App
