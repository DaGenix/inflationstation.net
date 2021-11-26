import {styled} from "linaria/react";
import {FilterState, UpdateFilterState} from "../../util/useFilterState";
import FilterInput from "./FilterInput";
import SelectInclude from "./SelectInclude";
import SelectOrder from "./SelectOrder";
import SelectOrderBy from "./SelectOrderBy";

const Bar = styled.div`
    padding: 8px 8px 0 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    align-content: stretch;
    gap: 8px;
`;

const SortOptionsGroup = styled.div`
    display: flex;
    flex-flow: row nowrap;
    gap: 8px;
`;

type FilterBarProps = {
    filterState: FilterState,
    updateFilterState: UpdateFilterState,
}

export default function FilterBar(props: FilterBarProps) {
    const {filterState, updateFilterState} = props;
    return (
        <Bar
            className="hide-without-js"
        >
            <FilterInput filter={filterState.filter} updateFilterState={updateFilterState} />
            <SelectInclude include={filterState.include} updateFilterState={updateFilterState} />
            <SortOptionsGroup>
                <SelectOrderBy orderBy={filterState.orderBy} updateFilterState={updateFilterState} />
                <SelectOrder order={filterState.order} updateFilterState={updateFilterState} />
            </SortOptionsGroup>
        </Bar>
    );
}
