import { useContext, useEffect, useState } from "react";
import { PatientsContext } from "./contexts/PatientsContextProvider";
import { FilterDataContext } from "./contexts/FilterContextProvider";

export default function CustomForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    pesel: "",
    city: "",
    street: "",
    postal: "",
  });

  const {id, index, setIndex, setCurrentEditId, setTkn } =
    useContext(PatientsContext);
  const { filteredData } = useContext(FilterDataContext);

  useEffect(() => {
    if (index != "-1") {
      setFormData(filteredData[parseInt(index)]);
    }
  }, [index]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (index == "-1") {
        const response = await fetch("http://localhost:8000/addpatient", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          console.log("Patient added successfully!");
        } else {
          console.error("Failed to add patient");
        }
      } else {
        const response = await fetch(
          `http://localhost:8000/editPatient/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          console.log("Patient added successfully!");
        } else {
          console.error("Failed to add patient");
        }
        setIndex("-1");
        setCurrentEditId("-1")
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setTkn((token)=>token+".")
    }
    console.log(formData);
  };

  return (
    <>
    <p>
    Mode: {id=="-1" ? "Add" : "Edit"}
    </p>
    <form action="/submit" method="post" onSubmit={handleSubmit}>
      <label>Name:</label>
      <br />
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      <br />
      <label>Surname:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="pesel">PESEL:</label>
      <input
        type="text"
        id="pesel"
        name="pesel"
        value={formData.pesel}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="city">City:</label>
      <input
        type="text"
        id="city"
        name="city"
        value={formData.city}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="street">Street:</label>
      <input
        type="text"
        id="street"
        name="street"
        value={formData.street}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="postal">Postal:</label>
      <input
        type="text"
        id="postal"
        name="postal"
        value={formData.postal}
        onChange={handleChange}
      />

      <input type="submit" value="Wyślij" />
    </form>
    </>
  )
}
