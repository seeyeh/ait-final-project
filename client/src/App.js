import React, {useEffect, useState} from 'react'

function App() {

  const [backendData, setBackendData] = useState([{}]);

  useEffect(()=> {
    fetch("/test").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data);
        console.log(JSON.stringify(data))
      }
    )
  }, [])

  let attempts;
  if(backendData.attempts) {
    console.log(backendData.attempts);
    attempts = backendData.attempts.map((attempt) => {
      return (<div>
        <h1>{attempt.lastDone}</h1>
        <p>{JSON.stringify(attempt.sets)}</p>
      </div>)
    })
    console.log(attempts)
  }
  
  return (
    <div>
      {(typeof backendData === 'undefined') ? (<p>Loading...</p>) : (
        attempts)}
    </div>
  )
}

export default App
