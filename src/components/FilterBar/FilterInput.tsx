import React, {useCallback} from "react";
import {styled} from "linaria/react";
import {css} from "linaria";
import {theme} from "../theme";
import {FilterState} from "../../util/filterState";

const Input = styled.input`
    height: 2rem;
    border: 1px solid ${theme.colors.primary};
    border-radius: ${theme.borderRadius};

    &:focus-visible {
        outline: ${theme.focusOutlineSize} solid ${theme.colors.secondary};
    }
`

type FilterInputProps = {
    filterState: FilterState,
    setFilterState: (FilterState) => void,
}

const FilterInput = (props: FilterInputProps): JSX.Element => {
    const {filterState, setFilterState} = props;

    const onSetFilter = useCallback(e => setFilterState({...filterState, filter: e.target.value}), [filterState, setFilterState]);

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
                value={filterState.filter}
                onChange={onSetFilter}
            />
        </div>
    )
};

export default FilterInput;
