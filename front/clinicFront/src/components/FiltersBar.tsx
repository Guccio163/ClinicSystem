
import { useContext} from "react";
import { FilterDataContext } from "./contexts/FilterContextProvider";
import { TextField } from "@mui/material";
import CustomForm from "./CustomForm";

export default function FiltersBar() {
  const {
    filterName,
    filterSurname,
    setFilterName,
    setFilterSurname,
  } = useContext(FilterDataContext);

  const handleNameChangeS = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName([event.target.value[0], filterName[1]]);
  };

  const handleNameChangeE = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName([filterName[0], event.target.value[0]]);
    console.log(filterName);
  };

  const handleSurnameChangeS = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterSurname([event.target.value[0], filterSurname[1]]);
  };

  const handleSurnameChangeE = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterSurname([filterSurname[0], event.target.value[0]]);
  };

  return (
    <div style={{ width: "20%", padding: "20px" }}>
      Filter Names:
      <div style={{ display: "flex", flexDirection: "row", margin: "10px" }}>
        <TextField
          id="outlined-basic"
          label="Od"
          variant="outlined"
          value={filterName[0]}
          onChange={handleNameChangeS}
        />
        <TextField
          id="outlined-basic"
          label="Do"
          variant="outlined"
          value={filterName[1]}
          onChange={handleNameChangeE}
        />
      </div>
      Filter Surnames:
      <div style={{ display: "flex", flexDirection: "row", margin: "10px" }}>
        <TextField
          id="outlined-basic"
          label="Od"
          variant="outlined"
          value={filterSurname[0]}
          onChange={handleSurnameChangeS}
        />
        <TextField
          id="outlined-basic"
          label="Do"
          variant="outlined"
          value={filterSurname[1]}
          onChange={handleSurnameChangeE}
        />
      </div>
      <CustomForm />
    </div>
  );
}
