import { createContext, useState, useContext } from "react";

const UsersContext = createContext();

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ahsan Ali",
      status: "Recovered",
      days: 120,
      targetDays: 150,
      activities: ["Daily Exercise", "Meditation", "Counseling"],
      achievements: [
        {
          title: "7 Days Streak",
          description: "Completed 7 continuous days of recovery.",
        },
        {
          title: "First Breathing Session",
          description: "Completed first guided breathing activity.",
        },
      ],
    },
    {
      id: 2,
      name: "Basit Khan",
      status: "Not Recovered",
      days: 12,
      targetDays: 30,
      activities: [],
      achievements: [
        {
          title: "7 Days Streak",
          description: "Completed 7 continuous days of recovery.",
        },
        {
          title: "First Breathing Session",
          description: "Completed first guided breathing activity.",
        },
      ],
    },
    {
      id: 3,
      name: "Kashif Raza",
      status: "Recovered",
      days: 200,
      targetDays: 180,
      activities: ["Support Group", "Therapy", "Journaling"],
      achievements: [
        {
          title: "7 Days Streak",
          description: "Completed 7 continuous days of recovery.",
        },
        {
          title: "First Breathing Session",
          description: "Completed first guided breathing activity.",
        },
      ],
    },
    {
      id: 4,
      name: "Hamza Ahmed",
      status: "Not Recovered",
      days: 5,
      targetDays: 60,
      activities: [],
      achievements: [
        {
          title: "7 Days Streak",
          description: "Completed 7 continuous days of recovery.",
        },
        {
          title: "First Breathing Session",
          description: "Completed first guided breathing activity.",
        },
      ],
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
