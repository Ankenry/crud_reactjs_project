import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

interface User {
  name: string;
  year: number;
  place: string;
}

function Update() {
  const { id } = useParams();
  const [value, setValue] = useState<User>({
    name: '',
    year: 0,
    place: '',
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<User>(`http://localhost:3001/users/${id}`)
      .then((res) => {
        setValue(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.put(`http://localhost:3001/users/${id}`, value)
      .then(res => {
        console.log(res);
        navigate('/home');
        alert(`Update success user ${value.name}`);
      })
      .catch(err => console.log(err));
  }

  if (loading) return <div>Loading....</div>;

  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Update User</h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-2">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              value={value.name}
              onChange={(e) => setValue({...value, name: e.target.value})}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="year">Year:</label>
            <input
              type="text"
              name="year"
              className="form-control"
              placeholder="Enter Year"
              value={value.year}
              onChange={(e) => setValue({...value, year: Number(e.target.value)})}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="place">Place:</label>
            <input
              type="text"
              name="place"
              className="form-control"
              placeholder="Enter Place"
              value={value.place}
              onChange={(e) => setValue({...value, place: e.target.value})}
            />
          </div>
          <button className="btn btn-success">Submit</button>
          <Link to="/home" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Update;
