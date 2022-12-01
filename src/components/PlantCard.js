import React, { useState } from "react";

function PlantCard({ plant, onDeletePlant }) {
  const [isInStock, setInStock] = useState(true);

  function handleInStockClick() {
    setInStock((isInStock) => !isInStock);
  }
  const { name, image, price } = plant;

  const classChange = isInStock ? "primary" : "";

  function handleDeleteClick() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeletePlant(plant));
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      <button onClick={handleInStockClick} className={classChange}>
        {isInStock ? "In Stock" : "Out of Stock"}
      </button>
      <button onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default PlantCard;
