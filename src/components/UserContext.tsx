import { createContext, useState, ReactNode } from 'react';
import Candidate from '../interfaces/Candidate.interface';

interface UserContextProps {
    savedUsers: Candidate[];
    setSavedUsers: React.Dispatch<React.SetStateAction<Candidate[]>>;
  }
  
  export const UserContext = createContext<UserContextProps | undefined>(undefined);
  
  export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [savedUsers, setSavedUsers] = useState<Candidate[]>(() => {
      const saved = localStorage.getItem('savedUsers');
      return saved ? JSON.parse(saved) : [];
    });
  
    return (
      <UserContext.Provider value={{ savedUsers, setSavedUsers }}>
        {children}
      </UserContext.Provider>
    );
  };
