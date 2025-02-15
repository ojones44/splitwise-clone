import { useContext, createContext, useState, useEffect } from 'react';
import { GroupData } from '../types/interfaces';

interface ContextReturnValues {
	fetchGroupData?: () => void;
	groupData?: GroupData[] | null;
}

type ContextProps = {
	children: React.ReactNode;
};

const AppContext = createContext<ContextReturnValues>({});

export const AppProvider = ({ children }: ContextProps) => {
	const [groupData, setGroupData] = useState<GroupData[] | null>();

	const fetchGroupData = async () => {
		const res = await fetch('/groupData.json');
		const data: GroupData[] = await res.json();
		setGroupData(data);
	};

	useEffect(() => {
		fetchGroupData();
	}, []);

	return (
		<AppContext.Provider value={{ fetchGroupData, groupData }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);
