import {OrderByType, validateOrderByOrDefault} from "../../util/urlUtil";
import {UpdateFilterState} from "../../util/useFilterState";
import React, {useCallback} from "react";
import {styled} from "linaria/react";
import {css} from "linaria";

const Select = styled.select`
    height: 2rem;
`

type SelectOrderByProps = {
    orderBy: OrderByType,
    updateFilterState: UpdateFilterState,
}

const SelectOrderBy = React.memo(function SelectOrderBy(props: SelectOrderByProps) {
    const {orderBy, updateFilterState} = props;

    const onSetOrderBy = useCallback(e => updateFilterState({orderBy: validateOrderByOrDefault(e.target.value)}), []);

    return (
        <div
            className={css`
                display: flex;
                flex-flow: column nowrap;
                color: white;

                flex: 1;
            `}
        >
            <label htmlFor="orderby">Order</label>
            <Select
                id="orderby"
                value={orderBy}
                onChange={onSetOrderBy}
            >
                <option value="year">Year</option>
                <option value="price">Today's Price</option>
                <option value="orig-price">Original Price</option>
                <option value="manufacturer">Manufacturer</option>
            </Select>
        </div>
    )
});

export default SelectOrderBy;
