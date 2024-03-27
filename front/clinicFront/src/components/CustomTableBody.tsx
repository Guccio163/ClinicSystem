import TableBody from "@mui/material/TableBody";
import { useContext } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { SortContext } from "./contexts/SortContextProvider";
import { FilterDataContext } from "./contexts/FilterContextProvider";
import { Patient, PatientsContext } from "./contexts/PatientsContextProvider";

export default function CustomTableBody() {
  const { sortParam, sortDirection } = useContext(SortContext);
  const { filteredData } = useContext(FilterDataContext);
  const {setCurrentEditId, setIndex, setTkn} = useContext(PatientsContext)

  const getCompareValue = (p: Patient) => {
    if (sortParam == "pesel") {
      return parseInt(p.pesel);
    } else if (sortParam == "lastName") {
      return p.lastName;
    }
    return p.firstName;
  };

  const sortFunction = (n1: Patient, n2: Patient) => {
    if (getCompareValue(n1) > getCompareValue(n2)) {
      return sortDirection * 1;
    } else if (getCompareValue(n1) < getCompareValue(n2)) {
      return sortDirection * -1;
    } else {
      return 0;
    }
  };

  function setForm(index:string, id:string) {
    setIndex(index)
    setCurrentEditId(id)
  }

 async function deleteRecord(id:string) {
    try {
      const response = await fetch(`http://localhost:8000/deletePatient/${id}`, {
        method: "DELETE",
      });
      console.log(id)
      if (response.ok) {
        console.log("Patient removed successfully!");
      } else {
        console.error("Failed to remove patient");
      }
      setCurrentEditId("-1")
    } catch (error) {
      console.error("Error:", error);
    } finally {
        setTkn((token)=>token+".")
    }
  }

  return (
    <>
      <TableBody>
        {filteredData.sort(sortFunction).map((row, index) => (
          <TableRow
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            key={index}
          >
            <TableCell component="th" scope="row">
              {row.firstName}
            </TableCell>
            <TableCell align="right">{row.lastName}</TableCell>
            <TableCell align="right">{row.pesel}</TableCell>
            <TableCell align="right">
              {row.city} {row.street} {row.postal}
            </TableCell>
            <TableCell align="right">
              <button onClick={()=>setForm(`${index}`, row.id)}>edit</button>
              <button onClick={()=>deleteRecord(row.id)}>delete</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}
