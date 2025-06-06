import React, { createContext } from 'react';
import { HomeTableStateType } from '../Views/Home/HomeTableState/InitialHomeTableState';

interface SharedContextType {
    setCurrentView?: React.Dispatch<React.SetStateAction<string>>;
    selectedRowData?: unknown; // TODO fill out
    setSelectedRowData?: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    homeTableState?: HomeTableStateType;
    setHomeTableState?: React.Dispatch<React.SetStateAction<HomeTableStateType>>;
}
const SharedContext = createContext<SharedContextType>({});

export default SharedContext;
