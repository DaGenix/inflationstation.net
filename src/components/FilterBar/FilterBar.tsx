import FilterInput from "./FilterInput";
import SelectInclude from "./SelectInclude";
import SelectOrder from "./SelectOrder";
import SelectOrderBy from "./SelectOrderBy";
import ShowIfJs from "../ShowIfJs";
import {FilterState} from "../../util/filterState";
import AsOf from "./AsOf";
import style from "./FilterBar.module.scss";
import {ClientDataType} from "../../util/loadData";

type FilterBarProps = {
    filterState: FilterState,
    setFilterState: (FilterState) => void,
    data: ClientDataType,
}

export default function FilterBar(props: FilterBarProps) {
    const {filterState, setFilterState, data} = props;
    return (
        <>
            <ShowIfJs>
                <div className={style.bar}>
                    <AsOf filterState={filterState} setFilterState={setFilterState} data={data} />
                    <FilterInput filterState={filterState} setFilterState={setFilterState} />
                    <SelectInclude filterState={filterState} setFilterState={setFilterState} />
                    <div className={style.sortOptionsGroup}>
                        <SelectOrderBy filterState={filterState} setFilterState={setFilterState} />
                        <SelectOrder filterState={filterState} setFilterState={setFilterState} />
                    </div>
                </div>
            </ShowIfJs>
        </>
    );
}
