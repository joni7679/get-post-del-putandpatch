import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Edit() {
  let navigate = useNavigate();
  const [stuData, SetStuData] = useState({});
  let userID = window.localStorage.getItem("userId");
  console.log(userID);


  useEffect(() => {
    if (userID) {
      axios.get(`http://localhost:3000/students/${userID}`).then((response) => {
        console.log(response.data);
        SetStuData(response.data);
      }).catch((error) => {
        console.log(error);
      });
    }

  }, [userID]);

  //  update form data
  let updateForm = (event) => {
    event.preventDefault();
    
    let Data = {
      name: stuData.name,
      email: stuData.email,
      password: stuData.password,
      phone: stuData.phone
    }

    axios.put(`http://localhost:3000/students/${userID}`, Data).then((res) => {
      console.log(res.data);
      SetStuData(res.data);

    }).catch((error) => {
      console.log(error);
    });

    navigate('/userdata');


  }






  return (
    <>
      <form onSubmit={updateForm} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Data</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={stuData.name || ''}
            onChange={(event) => SetStuData({ ...stuData, name: event.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"

          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={stuData.email || ''}
            onChange={(event) => SetStuData({ ...stuData, email: event.target.value })}

            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"

          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="number"
            name="number"
            value={stuData.phone || ''}
            onChange={(event) => SetStuData({ ...stuData, phone: event.target.value })}

            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your Phone Number"

          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={stuData.password || ''}
            onChange={(event) => SetStuData({ ...stuData, password: event.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"

          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Update
        </button>
      </form>


    </>
  )
}

export default Edit