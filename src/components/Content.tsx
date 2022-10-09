import {styled} from "linaria/react";
import CardContainer from "./CardContainer";
import {theme} from "./theme";
import {FilterState} from "../util/filterState";

const Main = styled.main`
    flex-grow: 1;
    padding: 0 ${theme.gap}px 0 ${theme.gap}px;
`;

type ContentProps = {
    filterState: FilterState,
    setFilterState: (FilterState) => void,
}

export default function Content(props: ContentProps) {
    const {filterState, setFilterState} = props;

    return (
        <Main>
            <CardContainer filterState={filterState} setFilterState={setFilterState} />
        </Main>
    );
}
