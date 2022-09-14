import React, { useState } from 'react';

function GuitarForm({sellGuitar}) {

    document.body.style.backgroundImage = "url('https://wallpaperaccess.com/full/1470299.jpg')"
    document.body.style.backgroundRepeat = "no-repeat"
    document.body.style.backgroundSize = "cover"

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        image_url: ""
    })

    const isValid = Boolean(formData.name && formData.description && formData.price && formData.image_url);

    const handleForm = (e) => {
        e.preventDefault();
        if (isValid) {
            fetch('http://localhost:9292/guitars', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(res => res.json())
            .then(sellGuitar(formData))

        setFormData({
            name: "",
            description: "",
            price: "",
            image_url: ""
        })

        alert('New guitar added successfully!');
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
        <div className="form-container">
            <h2>Please fill out form to sell a guitar</h2>
                <form onSubmit={handleForm}>
                    <input type="text" name="name" value={formData.name} placeholder="e.g. Taylor 214ce Rosewood Grand Auditorium Acoustic-Electric Guitar Natural" onChange={handleFormChange} />
                    <input type="text" name="description" value={formData.description} placeholder="e.g. A gorgeous layered rosewood back and sides adorn an internal architecture that has been optimized for even more volume and dynamics. All 200 Series guitars ship in a lightweight, Taylor gig bag with double-stitched seams and reinforced stress points." onChange={handleFormChange}/>
                    <input type="text" name="price" value={formData.price} placeholder="e.g. 999.00" onChange={handleFormChange}/>
                    <input type="text" name="image_url" value={formData.image_url} placeholder="e.g. https://media.guitarcenter.com/is/image/MMGS7/L69529000001000-00-720x720.jpg" onChange={handleFormChange}/>
                    <button type="submit" value="submit" disabled={!isValid}>{isValid ? "Submit" : "All fields must be filled out"}</button>
                </form>
        </div>
    )
}

export default GuitarForm;