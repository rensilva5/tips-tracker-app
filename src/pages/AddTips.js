// import { async } from '@firebase/util'
import { addDoc, collection } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase-Config'
import { useNavigate } from 'react-router-dom'

function AddTips({isAuth}) {
  const [title, setTitle] = useState('')
  const [addTip, setAddTip] = useState('')

  const tipsCollectionRef = collection(db, 'tips')
  let navigate = useNavigate()
  const addNewTip = async () => {
    await addDoc(tipsCollectionRef, {title, addTip, author: { name: auth.currentUser.displayName , id: auth.currentUser.uid}})
    navigate('/')
  }

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  }, [])

  return (
    <div className='create-post-page'>
      <div className='create-post-container'>
        <h1>Add tip</h1>
        <div className='input-create'>
          <label>Date:</label>
          <input placeholder='Input date' onChange={(event) => {
            setTitle(event.target.value)
          }}/>
        </div>
        <div className='input-create'>
          <label>Tips</label>
          <input type="number" placeholder='$...'onChange={(event) => {
            setAddTip(event.target.value)
          }}/>
        </div>
        <button onClick={addNewTip}>Submit tip</button>
      </div>
    </div>
  )
}

export default AddTips
