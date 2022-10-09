import React, {useCallback} from "react";
import {styled} from "linaria/react";
import {css} from "linaria";
import {theme} from "../theme";
import {FilterState} from "../../util/filterState";
import {addMonths, monthsBetween, yearMonthsEqual} from "../../util/yearMonth";
import {useData} from "../../util/useData";
import monthNumberToName from "../../util/monthNumberToName";

const Input = styled.input`
    height: 2rem;
`

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
            className={css`
                display: flex;
                flex-flow: column nowrap;

                width: 100%;
                @media (min-width: 700px) {
                    width: 12rem;
                }
            `}
        >
            <label htmlFor="asOf">As of {monthNumberToName(asOf.month)}, {asOf.year}</label>
            <Input
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
