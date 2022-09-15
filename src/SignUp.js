import React, { useState } from 'react';

function SignUp({createAnAccount}) {

  document.body.style.backgroundImage = "url('https://cdn.pixabay.com/photo/2016/09/27/23/03/guitar-1699501_960_720.jpg')"
  document.body.backgroundRepeat = "no-repeat"
  document.body.style.backgroundSize = "cover"

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    password: ""
  })

  const isValid = Boolean(formData.name && formData.phone && formData.address && formData.email && formData.password);

  const handleNewAccount = (e) => {
      e.preventDefault();
      if (isValid) {
          fetch('http://localhost:9292/customers', {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(formData)
          })
          .then(res => res.json())
          .then(createAnAccount(formData))

      setFormData({
        name: "",
        phone: "",
        address: "",
        email: "",
        password: ""
      })

      alert('Signed up successfully!');
      }
  }

  const handleFormChange = (e) => {
    const key = e.target.name
    const value = e.target.value

    setFormData({
        ...formData, [key] : value
    })
  }

  return (
    <div className="signup-container">
      <h2>Create an account</h2>
      <form onSubmit={handleNewAccount}>
          <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="e.g. John Smith"></input>
          <input type="text" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="e.g. 0001112222"></input>
          <input type="text" name="address" value={formData.address} onChange={handleFormChange} placeholder="e.g. 2636 E Shore Dr San Francisco, CA 81091"></input>
          <input type="text" name="email" value={formData.email} onChange={handleFormChange} placeholder="e.g. johnsmith@gmail.com"></input>
          <input type="password" name="password" value={formData.password} onChange={handleFormChange} placeholder="Enter a unique password..."></input>
          <button>{ isValid ? "Sign Up!" : "Please fill out all fields" }</button>
      </form>
    </div>
  )
}

export default SignUp;