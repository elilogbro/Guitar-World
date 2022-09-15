
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Account({user, handleDeletedUser, handleUpdatedUser}) {
    
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1605020420620-20c943cc4669?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')";
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';

    const [deleteClicked, setDeleteClicked] = useState(false)
    const [nameClicked, setNameClicked] = useState(false)
    const [phoneClicked, setPhoneClicked] = useState(false)
    const [addressClicked, setAddressClicked] = useState(false)
    const [emailClicked, setEmailClicked] = useState(false)
    const [passwordClicked, setPasswordClicked] = useState(false)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleNameClick = () => {
        setNameClicked(!nameClicked)
    }
    const handlePhoneClick = () => {
        setPhoneClicked(!phoneClicked)
    }
    const handleAddressClick = () => {
        setAddressClicked(!addressClicked)
    }
    const handleEmailClick = () => {
        setEmailClicked(!emailClicked)
    }
    const handlePasswordClick = () => {
        setPasswordClicked(!passwordClicked)
    }

    let navigate = useNavigate();
    const handleDeleteClick = () => {
        setDeleteClicked(!deleteClicked)
        fetch(`http://localhost:9292/customers/${user[0].id}`, {
            method: "DELETE"
        })
        handleDeletedUser(user[0].id)

        alert('Account deleted successfully')

        let path = '/';
        navigate(path);
    }

    const updateUserName = (e) => {
        e.preventDefault();

        fetch(`http://localhost:9292/customers/${user[0].id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: name})
        })
        .then(res => res.json())
        .then(updatedUser => handleUpdatedUser(updatedUser))
    
        setName("")
        setNameClicked(false)
    
        alert('Name updated successfully!');
    }

    const updateUserPhone = (e) => {
        e.preventDefault();

        fetch(`http://localhost:9292/customers/${user[0].id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({phone: phone})
        })
        .then(res => res.json())
        .then(updatedUser => handleUpdatedUser(updatedUser))
    
        setPhone("")
        setPhoneClicked(false)
    
        alert('Phone updated successfully!');
    }

    const updateUserAddress = (e) => {
        e.preventDefault();

        fetch(`http://localhost:9292/customers/${user[0].id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({address: address})
        })
        .then(res => res.json())
        .then(updatedUser => handleUpdatedUser(updatedUser))
    
        setAddress("")
        setAddressClicked(false)
    
        alert('Address updated successfully!');
    }

    const updateUserEmail = (e) => {
        e.preventDefault();

        fetch(`http://localhost:9292/customers/${user[0].id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: email})
        })
        .then(res => res.json())
        .then(updatedUser => handleUpdatedUser(updatedUser))
    
        setEmail("")
        setEmailClicked(false)
    
        alert('Email updated successfully!');
    }

    const updateUserPassword = (e) => {
        e.preventDefault();

        fetch(`http://localhost:9292/customers/${user[0].id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({password: password})
        })
        .then(res => res.json())
        .then(updatedUser => handleUpdatedUser(updatedUser))
    
        setPassword("")
        setPasswordClicked(false)
    
        alert('Password updated successfully!');
    }

    return (
        <div className="account-container">
            <button onClick={ handleDeleteClick }>Delete Account</button>
            { (user.length > 0) &&
                <div className="user-details-container">
                    { !nameClicked ? <p onClick={ handleNameClick }>Name: { user[0].name } ✏️</p>
                        : 
                            <form onSubmit={ updateUserName }>
                                <input type="text" name="name" value={ name } onChange={ (e) => setName(e.target.value) } placeholder="Enter a new name"></input>
                                <button type="submit">Submit</button>
                            </form>
                    }
                    { !phoneClicked ? <p onClick={ handlePhoneClick }>Phone: { user[0].phone } ✏️</p>
                        : 
                            <form onSubmit={ updateUserPhone }>
                                <input type="text" name="phone" value={ phone } onChange={ (e) => setPhone(e.target.value) } placeholder="Enter a new phone number"></input>
                                <button type="submit">Submit</button>
                            </form>
                    }
                    { !addressClicked ? <p onClick={ handleAddressClick }>Address: { user[0].address } ✏️</p>
                        : 
                            <form onSubmit={ updateUserAddress }>
                                <input type="text" name="address" value={ address } onChange={ (e) => setAddress(e.target.value) } placeholder="Enter a new address"></input>
                                <button type="submit">Submit</button>
                            </form>
                    }
                    { !emailClicked ?  <p onClick={ handleEmailClick }>Email: { user[0].email } ✏️</p>
                        : 
                            <form onSubmit={ updateUserEmail }>
                                <input type="text" name="email" value={ email } onChange={ (e) => setEmail(e.target.value) } placeholder="Enter a new email"></input>
                                <button type="submit">Submit</button>
                            </form>
                    }
                    { !passwordClicked ? <p onClick={ handlePasswordClick }>Password: { user[0].password } ✏️</p>
                        :
                            <form onSubmit={ updateUserPassword }>
                                <input type="text" name="password" value={ password } onChange={ (e) => setPassword(e.target.value) } placeholder="Enter a new password"></input>
                                <button type="submit">Submit</button>
                            </form>
                    }
                </div>
            }
        </div>
    )
}

export default Account;