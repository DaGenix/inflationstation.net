import {styled} from "linaria/react";
import FilterBar from "./FilterBar/FilterBar";
import {FilterState, UpdateFilterState} from "../util/useFilterState";
import CardContainer from "./CardContainer";
import {DataType} from "../util/data";

const Main = styled.main`
    flex-grow: 1;
`;

type ContentProps = {
    data: DataType,
    filterState: FilterState,
    updateFilterState: UpdateFilterState,
}

export default function Content(props: ContentProps) {
    const {data, filterState, updateFilterState} = props;

    return (
        <Main>
            <FilterBar filterState={filterState} updateFilterState={updateFilterState} />
            <CardContainer data={data} filterState={filterState} updateFilterState={updateFilterState} />
        </Main>
    );
}
