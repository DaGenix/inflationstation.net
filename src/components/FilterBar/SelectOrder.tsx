import React, {useCallback} from "react";
import {css} from "linaria";
import Select from "./Select";
import {FilterState} from "../../util/filterState";

type SelectOrderProps = {
    filterState: FilterState,
    setFilterState: (FilterState) => void,
}

const SelectOrder = React.memo(function SelectOrder(props: SelectOrderProps) {
    const {filterState, setFilterState} = props;

    const onSetAscending = useCallback(e => setFilterState({...filterState, order: e.target.value === "asc" ? "asc" : "desc"}), [filterState, setFilterState]);

    return (
        <div
            className={css`
                display: flex;
                flex-flow: column nowrap;

                flex: 1;
            `}
        >
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
});

export default SelectOrder;
