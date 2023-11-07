import { createContext, useState } from "react";
export const Context = createContext();

const AppContext = ({ children }) => {
    const [SelectedTab,SetSelectedTab] = useState("Bitcoins"); // New state for completed tasks
    return (
        <Context.Provider
            value={{
           SelectedTab,SetSelectedTab
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default AppContext;