import { createContext, useState, useContext } from "react";

const UsersContext = createContext();

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ahsan Ali",
      status: "Recovered",
      days: 120, // actual days completed
      targetDays: 150, // user expected recover in 150 days
      activities: ["Daily Exercise", "Meditation", "Counseling"],
    },
    {
      id: 2,
      name: "Basit Khan",
      status: "Not Recovered",
      days: 12,
      targetDays: 30,
      activities: [],
    },
    {
      id: 3,
      name: "Kashif Raza",
      status: "Recovered",
      days: 200,
      targetDays: 180,
      activities: ["Support Group", "Therapy", "Journaling"],
    },
    {
      id: 4,
      name: "Hamza Ahmed",
      status: "Not Recovered",
      days: 5,
      targetDays: 60,
      activities: [],
    },
  ]);

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  return useContext(UsersContext);
}
