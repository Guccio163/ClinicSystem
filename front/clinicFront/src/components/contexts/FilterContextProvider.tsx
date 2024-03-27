import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { Patient, PatientsContext } from "./PatientsContextProvider";

export const FilterDataContext = createContext({
  filteredData: [
    {
      id: "id",
      firstName: "firstanem",
      lastName: "lastname",
      pesel: "12345678",
      city: "some city",
      street: "some street",
      postal: "some postal",
    },
  ],
  filterName: ["string", "string"],
  setFilterName: (value: React.SetStateAction<string[]>) => console.log(value),
  filterSurname: ["string", "string"],
  setFilterSurname: (value: React.SetStateAction<string[]>) =>
    console.log(value),
  filterPesel: ["pesel1", "pesel2"],
  setFilterPesel: (value: React.SetStateAction<string[]>) => console.log(value),
});

export default function FilterDataContextProvider({
  children,
}: PropsWithChildren) {
  const { patients } = useContext(PatientsContext);
  const [filterPesel, setFilterPesel] = useState(["000101", "242424"]);
  const [filterName, setFilterName] = useState(["A", "Ż"]);
  const [filterSurname, setFilterSurname] = useState(["A", "Ż"]);

  const filteredData: Patient[] = patients
    .filter(
      (patient: Patient) =>
        patient.firstName[0] >= filterName[0] &&
        patient.firstName[0] <= filterName[1]
    )
    .filter(
      (patient: Patient) =>
        patient.lastName[0] >= filterSurname[0] &&
        patient.lastName[0] <= filterSurname[1]
    );

  return (
    <FilterDataContext.Provider
      value={{
        filteredData: filteredData,
        filterPesel: filterPesel,
        setFilterPesel: setFilterPesel,
        filterName: filterName,
        setFilterName: setFilterName,
        filterSurname: filterSurname,
        setFilterSurname: setFilterSurname,
      }}
    >
      {children}
    </FilterDataContext.Provider>
  );
}
