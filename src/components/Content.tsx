import {styled} from "linaria/react";
import {FilterState, UpdateFilterState} from "../util/useFilterState";
import CardContainer from "./CardContainer";
import {DataType} from "../util/data";
import {theme} from "./theme";

const Main = styled.main`
    flex-grow: 1;
    padding: 0 ${theme.gap}px 0 ${theme.gap}px;
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
            <CardContainer data={data} filterState={filterState} updateFilterState={updateFilterState} />
        </Main>
    );
}
