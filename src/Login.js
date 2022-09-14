import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login({setUser, customers, user}) {

  document.body.style.backgroundImage = "url('https://cdn.pixabay.com/photo/2018/01/11/10/50/sunset-3075844_960_720.jpg')"
  document.body.style.backgroundRepeat = "no-repeat"
  document.body.style.backgroundSize = 'cover'

  const [formData, setFormData] = useState({
    email: "",
    password: ""
})

const handleChange = (e) => {
  const key = e.target.name
  const value = e.target.value

  setFormData({
      ...formData, [key] : value
  })
}

let navigate = useNavigate();

const handleLogin = (e) => {
  e.preventDefault();
  
  if (user.length === 0) {
    const findUser = customers.filter(customer => (customer.email && customer.password) === (formData.email && formData.password))
    setUser(findUser)
  }
  
  let path = '/';
  navigate(path);
}

  return (
    <div className="login-container">
      {user.length > 0 ? console.log("Logged in successfully!") :
      <div className="login-container-inner">
          <h2>Login to your account</h2>
          <form onSubmit={handleLogin}>
            <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email..." />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password..." />
            <button>Sign In</button>
          </form>
        </div> 
      }
    </div>
  )
}

export default Login;