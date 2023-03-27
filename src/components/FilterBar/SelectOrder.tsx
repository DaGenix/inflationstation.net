import React, {useCallback} from "react";
import Select from "./Select";
import {FilterState} from "../../util/filterState";
import style from "./SelectOrder.module.scss";

type SelectOrderProps = {
    filterState: FilterState,
    setFilterState: (FilterState) => void,
}

const SelectOrder = (props: SelectOrderProps): JSX.Element => {
    const {filterState, setFilterState} = props;

    const onSetAscending = useCallback(e => setFilterState({...filterState, order: e.target.value === "asc" ? "asc" : "desc"}), [filterState, setFilterState]);

    return (
        <div className={style.wrapper}>
            <label htmlFor="order">Direction</label>
            <Select
                id="order"
                value={filterState.order}
                onChange={onSetAscending}
            >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </Select>
        </div>
    )
};

export default SelectOrder;
