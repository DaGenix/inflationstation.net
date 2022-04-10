import {OrderType} from "../../util/urlUtil";
import {UpdateFilterState} from "../../util/useFilterState";
import React, {useCallback} from "react";
import {styled} from "linaria/react";
import {css} from "linaria";
import {theme} from "../theme";

const Select = styled.select`
    height: 2rem;
    border: 1px solid ${theme.colors.primary};
    border-radius: ${theme.borderRadius};
    background-color: unset;

    &:focus-visible {
        outline: ${theme.focusOutlineSize} solid ${theme.colors.secondary};
    }
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
