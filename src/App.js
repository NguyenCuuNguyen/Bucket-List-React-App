import React, { useState, useRef, useEffect } from 'react'; //useRef gets userinput in the box field, useEffect persist the change upon page refresh
import BucketList from './BucketList';
import Droplet from './Droplet';
//import uuidv4 from 'uuid/v4'
const {v4 : uuidv4} = require('uuid')

const LOCAL_STORAGE = "BucketListApp.Droplets"
function App() {
  //Use react hook useState to load state and rerender the website
  const [droplets, setDroplets] = useState([]) //initial input = [], return droplet and function setDroplets()
  const dropletNameRef = useRef()

  useEffect(()=>{
    const storedDroplets = JSON.parse(localStorage.getItem(LOCAL_STORAGE)) //convert to an array
    if (storedDroplets) setDroplets(storedDroplets)
  }, [])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(droplets))
  }, [droplets])

  function toggleDroplets(id){ //from completed to incomplete
    //always create a copy before modifying a variable, then setting with the copy
    const newDroplets = [...droplets]
    const droplet = newDroplets.find(droplet => droplet.id === id)
    droplet.complete = !droplet.complete
    setDroplets(newDroplets)
  }
  function handleDroplets(e){
    const name = dropletNameRef.current.value
    if (name === '') return //not add empty todo
    setDroplets(prevDroplets => {
      return [...prevDroplets, {id:uuidv4(), name: name, complete:false}]
    }) //function prevDroplets returns prev droplets and add new one
    dropletNameRef.current.value = null //empty out box after clicking add
  }
  function handleClearDroplets(e){
    const newDroplets = droplets.filter(droplet => !droplet.complete) 
    setDroplets(newDroplets)
  }
  return ( 
    <>
      <BucketList dropletList={droplets} toggleDroplets={toggleDroplets}/>  
      <input ref={dropletNameRef} type="text"></input>
      <button onClick={handleDroplets}>Add Bucket Goal</button>
      <button onClick={handleClearDroplets}>Completed</button>
      <div>{droplets.filter(droplet => !droplet.complete).length} Left to drop</div>
    </>
  )
}

export default App;
