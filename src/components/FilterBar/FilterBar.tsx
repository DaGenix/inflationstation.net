import {styled} from "linaria/react";
import FilterInput from "./FilterInput";
import SelectInclude from "./SelectInclude";
import SelectOrder from "./SelectOrder";
import SelectOrderBy from "./SelectOrderBy";
import ShowIfJs from "../ShowIfJs";
import {theme} from "../theme";
import {FilterState} from "../../util/filterState";

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
    setFilterState: (FilterState) => void,
}

export default function FilterBar(props: FilterBarProps) {
    const {filterState, setFilterState} = props;
    return (
        <>
            <ShowIfJs>
                <Bar>
                    <FilterInput filterState={filterState} setFilterState={setFilterState} />
                    <SelectInclude filterState={filterState} setFilterState={setFilterState} />
                    <SortOptionsGroup>
                        <SelectOrderBy filterState={filterState} setFilterState={setFilterState} />
                        <SelectOrder filterState={filterState} setFilterState={setFilterState} />
                    </SortOptionsGroup>
                </Bar>
            </ShowIfJs>
        </>
    );
}
