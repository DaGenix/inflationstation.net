import React, {useCallback} from "react";
import {FilterState} from "../../util/filterState";
import style from "./FilterInput.module.scss";

type FilterInputProps = {
    filterState: FilterState,
    setFilterState: (FilterState) => void,
}

const FilterInput = (props: FilterInputProps): JSX.Element => {
    const {filterState, setFilterState} = props;

    const onSetFilter = useCallback(e => setFilterState({...filterState, filter: e.target.value}), [filterState, setFilterState]);

    return (
        <div className={style.container}>
            <label htmlFor="filter">Filter</label>
            <input className={style.input}
                id="filter"
                value={filterState.filter}
                onChange={onSetFilter}
            />
        </div>
    )
};

export default FilterInput;
