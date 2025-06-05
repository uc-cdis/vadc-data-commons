import React, { createContext } from 'react';
import { HomeTableStateType } from '../Views/Home/HomeTableState/InitialHomeTableState';

interface SharedContextType {
    setCurrentView?: React.Dispatch<React.SetStateAction<string>>;
    selectedRowData?: {}; // TODO fill out
    setSelectedRowData?: React.Dispatch<React.SetStateAction<{}>>;
    homeTableState?: HomeTableStateType;
    setHomeTableState?: React.Dispatch<React.SetStateAction<HomeTableStateType>>;
}
const SharedContext = createContext<SharedContextType>({});

export default SharedContext;
