import React, { useState } from "react";

function NewPlantForm({ onHandleAddNewPlant }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    const plantData = {
      name: formData.name,
      image: formData.image,
      price: formData.price,
    };

    fetch(`http://localhost:6001/plants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plantData),
    })
      .then((r) => r.json())
      .then((newPlant) => onHandleAddNewPlant(newPlant));
  }

  function handleChange(e) {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={formData.name}
          type="text"
          name="name"
          placeholder="Plant name"
        />
        <input
          onChange={handleChange}
          value={formData.image}
          type="text"
          name="image"
          placeholder="Image URL"
        />
        <input
          onChange={handleChange}
          value={formData.price}
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
