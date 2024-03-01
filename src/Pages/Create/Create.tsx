import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Create() {
  const [value, setValue] = useState({
    name: '',
    year: '',
    place: '',
  })

  const navigation = useNavigate()
  const handleSubmit = (event:any) => {
    event.preventDefault();
    axios.post('http://localhost:3001/users', value)
    .then(res => {
      console.log(res)
      navigation('/home')
      alert(`Submit success user ${value.name}`)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='w-100 vh-100 d-flex justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h1>Add a User</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label htmlFor="name">Name:</label>
            <input type="text" name='name' className='form-control' placeholder='Enter Name' 
            onChange={e => setValue({...value, name: e.target.value})}/>
          </div>
          <div className='mb-2'>
            <label htmlFor="year">Year:</label>
            <input type="text" name='year' className='form-control' placeholder='Enter Year' 
            onChange={e => setValue({...value, year: e.target.value})}/>
          </div>
          <div className='mb-3'>
            <label htmlFor="place">Place:</label>
            <input type="text" name='place' className='form-control' placeholder='Enter Place' 
            onChange={e => setValue({...value, place: e.target.value})}/>
          </div>
          <button className='btn btn-success'>Submit</button>
          <Link to="/home" className='btn btn-primary ms-3'>Back</Link>
        </form>
      </div>

    </div>
  )
}

export default Create