import React, {useCallback} from "react";
import Select from "./Select";
import {FilterState, validateOrderByOrDefault} from "../../util/filterState";
import style from "./SelectOrder.module.scss";

type SelectOrderByProps = {
    filterState: FilterState,
    setFilterState: (FilterState) => void,
}

const SelectOrderBy = (props: SelectOrderByProps): JSX.Element => {
    const {filterState, setFilterState} = props;

    const onSetOrderBy = useCallback(e => setFilterState({...filterState, orderBy: validateOrderByOrDefault(e.target.value)}), [filterState, setFilterState]);

    return (
        <div className={style.wrapper}>
            <label htmlFor="orderby">Order by</label>
            <Select
                id="orderby"
                value={filterState.orderBy}
                onChange={onSetOrderBy}
            >
                <option value="year">Year</option>
                <option value="price">Today's Price</option>
                <option value="orig-price">Original Price</option>
                <option value="manufacturer">Manufacturer</option>
            </Select>
        </div>
    )
};

export default SelectOrderBy;
