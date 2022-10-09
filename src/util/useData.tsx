import React, {useContext, useMemo} from "react";
import {DataType, InflationData} from "./loadData";

type DataValues = {
    data: DataType,
    inflationData: InflationData,
}

const DataContext = React.createContext<DataValues | undefined>(undefined);

type WithDataContextProps = {
    data: DataType,
    inflationData: InflationData,
    children: React.ReactNode,
}

export const WithDataContext: React.FC<WithDataContextProps> = (props) => {
    const {
        data,
        inflationData,
        children,
    } = props;
    const value = useMemo(() => { return {data, inflationData} }, [data, inflationData]);
    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = (): DataValues => {
    const value = useContext(DataContext);
    if (!value) {
        throw new Error("DataContext not setup");
    }
    return value;
}
