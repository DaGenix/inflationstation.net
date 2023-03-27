import React, {useCallback} from "react";
import {FilterState} from "../../util/filterState";
import {addMonths, monthsBetween, yearMonthsEqual} from "../../util/yearMonth";
import {useData} from "../../util/useData";
import monthNumberToName from "../../util/monthNumberToName";
import style from "./AsOf.module.scss";

type AsOfProps = {
    filterState: FilterState,
    setFilterState: (FilterState) => void,
}

const AsOf = (props: AsOfProps): JSX.Element => {
    const {filterState, setFilterState} = props;
    const {data} = useData();

    const asOf = filterState.asOf === "mostRecent" ? data.inflation_year_month : filterState.asOf;
    const totalMonths = monthsBetween(data.earliest_year_month, data.inflation_year_month);
    const selectedMonth = monthsBetween(data.earliest_year_month, asOf);

    const onSetAsOf = useCallback(e => {
        const asOf = addMonths(data.earliest_year_month, e.target.value);
        setFilterState({
            ...filterState,
            asOf: yearMonthsEqual(asOf, data.inflation_year_month) ? "mostRecent" : asOf,
        })
    }, [data.earliest_year_month, data.inflation_year_month, filterState, setFilterState]);

    return (
        <div
            className={style.asOf}
        >
            <label htmlFor="asOf">As of {monthNumberToName(asOf.month)}, {asOf.year}</label>
            <input className={style.input}
                id="asOf"
                type="range"
                min="0"
                max={totalMonths}
                value={selectedMonth}
                onChange={onSetAsOf}
            />
        </div>
    )
};

export default AsOf;
