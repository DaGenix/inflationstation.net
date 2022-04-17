import {styled} from "linaria/react";
import {FilterState, UpdateFilterState} from "../../util/useFilterState";
import FilterInput from "./FilterInput";
import SelectInclude from "./SelectInclude";
import SelectOrder from "./SelectOrder";
import SelectOrderBy from "./SelectOrderBy";
import ShowIfJs from "../ShowIfJs";
import {theme} from "../theme";

const Bar = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    align-content: stretch;
    gap: ${theme.gap}px;
    grid-column: start / end;
`;

const SortOptionsGroup = styled.div`
    display: flex;
    flex-flow: row nowrap;
    gap: ${theme.gap}px;

    width: 100%;
    @media (min-width: ${theme.breakpoint}) {
        width: 250px;
    }
`;

type FilterBarProps = {
    filterState: FilterState,
    updateFilterState: UpdateFilterState,
}

export default function FilterBar(props: FilterBarProps) {
    const {filterState, updateFilterState} = props;
    return (
        <>
            <ShowIfJs>
                <Bar>
                    <FilterInput filter={filterState.filter} updateFilterState={updateFilterState} />
                    <SelectInclude include={filterState.include} updateFilterState={updateFilterState} />
                    <SortOptionsGroup>
                        <SelectOrderBy orderBy={filterState.orderBy} updateFilterState={updateFilterState} />
                        <SelectOrder order={filterState.order} updateFilterState={updateFilterState} />
                    </SortOptionsGroup>
                </Bar>
            </ShowIfJs>
        </>
    );
}
