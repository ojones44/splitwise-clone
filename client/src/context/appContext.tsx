import { useContext, createContext, useState, useEffect } from "react";
import { GroupData } from "../types/interfaces";

interface ContextReturnValues {
  fetchGroupData?: () => void;
  groupData?: GroupData[] | null;
  user?: string | null;
  token?: string | null;
}

type ContextProps = {
  children: React.ReactNode;
};

const AppContext = createContext<ContextReturnValues>({});

export const AppProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [groupData, setGroupData] = useState<GroupData[] | null>();

  const fetchGroupData = async () => {
    const res = await fetch("/groupData.json");
    const data: GroupData[] = await res.json();
    setGroupData(data);
  };

  useEffect(() => {
    fetchGroupData();
  }, []);

  return (
    <AppContext.Provider value={{ fetchGroupData, groupData, user, token }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
