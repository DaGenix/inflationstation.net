import {UpdateFilterState} from "../../util/useFilterState";
import React, {useCallback} from "react";
import {styled} from "linaria/react";
import {css} from "linaria";

const Input = styled.input`
    height: 2rem;
`

type FilterInputProps = {
    filter: string,
    updateFilterState: UpdateFilterState,
}

const FilterInput = React.memo(function FilterInput(props: FilterInputProps) {
    const {filter, updateFilterState} = props;

    const onSetFilter = useCallback(e => updateFilterState({filter: e.target.value}), []);

    return (
        <div
            className={css`
                display: flex;
                flex-flow: column nowrap;
                color: white;
               
                width: 100%; 
                @media (min-width: 600px) {
                    width: unset;
                }
            `}
        >
            <label htmlFor="filter">Filter</label>
            <Input
                id="filter"
                value={filter}
                onChange={onSetFilter}
            />
        </div>
    )
});

export default FilterInput;
