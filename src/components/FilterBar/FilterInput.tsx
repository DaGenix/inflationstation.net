import {UpdateFilterState} from "../../util/useFilterState";
import React, {useCallback} from "react";
import {styled} from "linaria/react";
import {css} from "linaria";
import {theme} from "../theme";

const Input = styled.input`
    height: 2rem;
    border: 1px solid black;
    border-radius: ${theme.borderRadius};

    &:focus-visible {
        outline: ${theme.focusOutlineSize} solid ${theme.colors.primary};
    }
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
               
                width: 100%; 
                @media (min-width: 700px) {
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
