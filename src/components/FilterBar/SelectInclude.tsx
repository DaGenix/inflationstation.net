import {IncludeType, validateIncludeOrDefault} from "../../util/urlUtil";
import {UpdateFilterState} from "../../util/useFilterState";
import React, {useCallback} from "react";
import {styled} from "linaria/react";
import {css} from "linaria";

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
            <label htmlFor="include">Include</label>
            <Select
                id="include"
                value={include}
                onChange={onSetInclude}
            >
                <option value="all">All</option>
                <option value="home">Home</option>
                <option value="handheld">Handheld</option>
            </Select>
        </div>
    )
});

export default SelectInclude;
