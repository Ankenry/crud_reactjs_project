import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

interface User {
  name: string;
  year: number;
  place: string;
}

function Read() {
  const [data, setData]=useState<User| null>(null)
  const {id} = useParams();

  useEffect(() =>{
    axios.get<User>('http://localhost:3001/users/'+id)
    .then(res => setData(res.data))
    .catch(err => console.log(err))
  }, [id])

  if(!data) return <div>Loading....</div>;

  return (
    <div className='w-100 vh-100 d-flex justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h3>Detail of User</h3>
        <div className='mb-2'>
          <strong>Name: {data.name}</strong>
        </div>
        <div className='mb-2'>
          <strong>Year: {data.year}</strong>
        </div>
        <div className='mb-3'>
          <strong>Place: {data.place}</strong>
        </div>
        <Link to={`/update/${id}`} className='btn btn-success'>Edit</Link>
        <Link to="/home" className='btn btn-primary ms-3'>Back</Link>
      </div>
    </div>
  )
}

export default Read