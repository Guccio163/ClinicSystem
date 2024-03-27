import { PropsWithChildren, createContext, useEffect, useState } from "react";

export type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  pesel: string;
  city: string;
  street: string;
  postal: string;
};

export default function PatientsContextProvider({
  children,
}: PropsWithChildren) {
  const [data, setData] = useState<Patient[]>([]);
  const [currentEditId, setCurrentEditId] = useState("-1");
  const [index, setIndex] = useState("-1");
  const [refrshTkn, setTkn] = useState("undone");

  useEffect(() => {
    fetchData();
  }, [refrshTkn]);

  async function fetchData() {
    try {
      const data = await fetch("http://127.0.0.1:8000/patients");
      const jsonData = await data.json();
      const result: Patient[] = [];
      jsonData.forEach((obj: any) => {
        let element = obj[1];
        let newPatient: Patient = {
          id: obj[0],
          firstName: element["firstName"],
          lastName: element["lastName"],
          pesel: element["PESEL"],
          city: element["Address"]["city"],
          street: element["Address"]["street"],
          postal: element["Address"]["postal"],
        };
        result.push(newPatient);
      });
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <PatientsContext.Provider
      value={{
        patients: data,
        id: currentEditId,
        setCurrentEditId: setCurrentEditId,
        index: index,
        setIndex: setIndex,
        tkn: refrshTkn,
        setTkn: setTkn
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
}

export const PatientsContext = createContext({
  patients: [
    {
      id: "id1",
      firstName: "first name 1",
      lastName: "last name 1",
      pesel: "11111111",
      city: "city1",
      street: "street1",
      postal: "postal1",
    },
    {
      id: "id2",
      firstName: "first name 1",
      lastName: "last name 1",
      pesel: "11111111",
      city: "city1",
      street: "street1",
      postal: "postal1",
    },
  ],
  id: "-1",
  setCurrentEditId: (value: React.SetStateAction<string>) => console.log(value),
  index: "-1",
  setIndex: (value: React.SetStateAction<string>) => console.log(value),
  tkn: "",
  setTkn: (value: React.SetStateAction<string>) => console.log(value),
});
