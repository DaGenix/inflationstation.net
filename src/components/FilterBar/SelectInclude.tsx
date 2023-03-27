import React, {useCallback} from "react";
import Select from "./Select";
import {FilterState, validateIncludeOrDefault} from "../../util/filterState";
import style from "./SelectInclude.module.scss";

type SelectIncludeProps = {
    filterState: FilterState,
    setFilterState: (FilterState) => void,
}

const SelectInclude = (props: SelectIncludeProps): JSX.Element => {
    const {filterState, setFilterState} = props;

    const onSetInclude = useCallback(e => setFilterState({...filterState, include: validateIncludeOrDefault(e.target.value)}), [filterState, setFilterState]);

    return (
        <div className={style.wrapper}>
            <label htmlFor="include">Include</label>
            <Select
                id="include"
                value={filterState.include}
                onChange={onSetInclude}
            >
                <option value="all">All</option>
                <option value="home">Home</option>
                <option value="handheld">Handheld</option>
            </Select>
        </div>
    )
};

export default SelectInclude;
