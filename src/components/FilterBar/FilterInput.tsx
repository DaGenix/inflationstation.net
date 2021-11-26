import {UpdateFilterState} from "../../util/useFilterState";
import React, {useCallback} from "react";
import {styled} from "linaria/react";

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
        <Input
            placeholder="Filter"
            value={filter}
            onChange={onSetFilter}
        />
    )
});

export default FilterInput;
