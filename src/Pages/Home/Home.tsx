import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

interface Users{
  id: number;
  name: string;
  year: number;
  place: string;
}

const Home: React.FC = () => {
  const [data, setData]=useState<Users[]>([])
  // const navigate = useNavigate()

  useEffect(() =>{
    axios.get<Users[]>('http://localhost:3001/users')
    .then(res => setData(res.data))
    .catch(err => console.log(err))
  }, [])

  const handleDelete = (id:number) => {
    const confirm = window.confirm('Are you sure you want to delete ?');
    if(confirm){
      axios.delete('http://localhost:3001/users/'+id)
      .then(res => {
        setData(data.filter(user => user.id !== id))
      })
      .catch(err => console.log(err))
    }
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
        <Link to="/" className='btn btn-sm btn-primary me-5'>LogOut</Link>
        <h1>List of Users</h1>
        <div className="w-75 rounded bg-white border shadow p-4 ">
          <div className='d-flex justify-content-end'>
            <Link to="/create" className='btn btn-success'>Add +</Link>
          </div>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Year</th>
                <th>Place</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((users)=>(
                  <tr key={users.id}>
                    <td>{users.id}</td>
                    <td>{users.name}</td>
                    <td>{users.year}</td>
                    <td>{users.place}</td>
                    <td>
                      <Link to={`/read/${users.id}`} className='btn btn-sm btn-info me-2'>View</Link>
                      <Link to={`/update/${users.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                      <button className='btn btn-sm btn-danger' onClick={() => handleDelete(users.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Home