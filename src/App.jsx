import axios from 'axios';
import React, { useState } from 'react'
import { data, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function App() {
  let navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');


  // handel form
  const handleForm = (event) => {
    event.preventDefault();
    console.log(name
      , email
      , password
    );
    let stuData = {
      name: name,
      email: email,
      password: password,
      phone: phone
    }

    if (name === '' || email === '' || password === '') {
      toast.error('All fields are required');
      return;
    }
    else {
      axios.post('http://localhost:3000/students', stuData).then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.log(error);
      });

      navigate('/userdata');
      setName('');
      setEmail('');
      setPassword('');
      

    }


  }

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleForm} className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"

            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}

              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"

            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="number"
              name="number"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}

              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your Phone Number"

            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"

            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>

    </>
  )
}

export default App