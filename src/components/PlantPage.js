import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`http://localhost:6001/plants`)
      .then((r) => r.json())
      .then((plants) => setPlants(plants));
  }, []);

  function handleAddNewPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleDeletePlant(deletedPlant) {
    const updatedItems = plants.filter((plant) => plant.id !== deletedPlant.id);
    setPlants(updatedItems);
  }

  return (
    <main>
      <NewPlantForm onHandleAddNewPlant={handleAddNewPlant} />
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <PlantList onDeletePlant={handleDeletePlant} plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;
