import CardContainer from "./CardContainer";
import {FilterState} from "../util/filterState";
import style from "./Content.module.scss";

type ContentProps = {
    filterState: FilterState,
    setFilterState: (FilterState) => void,
}

export default function Content(props: ContentProps) {
    const {filterState, setFilterState} = props;

    return (
        <main className={style.main}>
            <CardContainer filterState={filterState} setFilterState={setFilterState} />
        </main>
    );
}
