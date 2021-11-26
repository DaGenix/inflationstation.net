import {IncludeType, validateIncludeOrDefault} from "../../util/urlUtil";
import {UpdateFilterState} from "../../util/useFilterState";
import React, {useCallback} from "react";
import {styled} from "linaria/react";

const Select = styled.select`
    height: 2rem;
`

type SelectIncludeProps = {
    include: IncludeType,
    updateFilterState: UpdateFilterState,
}

const SelectInclude = React.memo(function SelectInclude(props: SelectIncludeProps) {
    const {include, updateFilterState} = props;

    const onSetInclude = useCallback(e => updateFilterState({include: validateIncludeOrDefault(e.target.value)}), []);

    return (
        <Select
            value={include}
            onChange={onSetInclude}
        >
            <option value="all">All</option>
            <option value="home">Home</option>
            <option value="handheld">Handheld</option>
        </Select>
    )
});

export default SelectInclude;
