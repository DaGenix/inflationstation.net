import {OrderType} from "../../util/urlUtil";
import {UpdateFilterState} from "../../util/useFilterState";
import React, {useCallback} from "react";
import {styled} from "linaria/react";

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
        <Select
            value={order}
            onChange={onSetAscending}
        >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </Select>
    )
});

export default SelectOrder;
