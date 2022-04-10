import {OrderType} from "../../util/urlUtil";
import {UpdateFilterState} from "../../util/useFilterState";
import React, {useCallback} from "react";
import {styled} from "linaria/react";
import {css} from "linaria";

const Select = styled.select`
    height: 2rem;
`

type SelectOrderProps = {
    order: OrderType,
    updateFilterState: UpdateFilterState,
}

const SelectOrder = React.memo(function SelectOrder(props: SelectOrderProps) {
    const {order, updateFilterState} = props;

    const onSetAscending = useCallback(e => updateFilterState({order: e.target.value === "asc" ? "asc" : "desc"}), []);

    return (
        <div
            className={css`
                display: flex;
                flex-flow: column nowrap;
                color: white;
            
                flex: 1;
            `}
        >
            <label htmlFor="order">Direction</label>
            <Select
                id="order"
                value={order}
                onChange={onSetAscending}
            >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </Select>
        </div>
    )
});

export default SelectOrder;
