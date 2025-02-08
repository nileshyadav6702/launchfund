import { createContext, useState } from "react";

export const DataContext = createContext();

export const Dataprovider = ({ children }) => {
  const [query, setquery] = useState("");

  return (
    <DataContext.Provider value={{ query, setquery }}>
      {children}
    </DataContext.Provider>
  );
};