import {IncludeType, OrderByType, OrderType} from "./urlUtil";
import {useReducer} from "react";

export type FilterState = {
    filter: string,
    include: IncludeType,
    orderBy: OrderByType,
    order: OrderType,
}

const DEFAULT: FilterState = {
    filter: "",
    include: "all",
    orderBy: "year",
    order: "desc",
};

export type StateUpdate = {
    filter?: string | undefined,
    include?: IncludeType | undefined,
    orderBy?: OrderByType | undefined,
    order?: OrderType | undefined,
}

export type UpdateFilterState = (stateUpdate: StateUpdate) => void;

const reducer = (state: FilterState, action: StateUpdate): FilterState => {
    const newState = {...state};
    if (typeof action.filter !== "undefined") {
        newState.filter = action.filter;
    }
    if (typeof action.include !== "undefined") {
        newState.include = action.include;
    }
    if (typeof action.orderBy !== "undefined") {
        newState.orderBy = action.orderBy;
    }
    if (typeof action.order !== "undefined") {
        newState.order = action.order;
    }
    return newState;
}

const useFilterState = (): [FilterState, UpdateFilterState] => {
    const [state, dispatch] = useReducer(reducer, DEFAULT);
    return [state, dispatch];
}

export default useFilterState;
