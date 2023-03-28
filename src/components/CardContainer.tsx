"use client";

import {priceAfterInflation} from "../util/data";
import {ReactNode, useMemo} from "react";
import ConsoleCard from "./ConsoleCard";
import NoResults from "./NoResults";
import FilterBar from "./FilterBar/FilterBar";
import {compareYearMonth, YearMonth} from "../util/yearMonth";
import {
    DEFAULT_FILTER_STATE,
    deserializeUrlSearchParams,
    IncludeType,
    OrderByType,
    OrderType, serializeUrlSearchParams
} from "../util/filterState";
import {ClientDataItemType, ClientDataType, InflationData} from "../util/loadData";
import style from "./CardContainer.module.scss";
import useUrlState from "../util/useUrlState";

const calculateSortedPositions = (inflationData: InflationData, items: ClientDataItemType[], asOf: YearMonth, orderBy: OrderByType, order: OrderType): number[] => {
    // Create two lists - significantly, the _items_ in each list are the same.
    // The first list we leave unsorted while the second list is sorted.
    // After we sort the second list, we record the position of every item in that list.
    // Then, we can iterate through the unsorted items in the first list in order to create a
    // mapping of the unsorted position to the sorted position.
    const unsortedItemsWithIndices: [ClientDataItemType, number][] = items.map(item => [item, -1]);
    const sortedItemsWithIndices = [...unsortedItemsWithIndices];
    sortedItemsWithIndices.sort(([a, ], [b, ]) => {
        switch (orderBy) {
            case "year":
                return compareYearMonth(a.release_year_month, b.release_year_month)
            case "price":
                return priceAfterInflation(inflationData, a, asOf)[0] - priceAfterInflation(inflationData, b, asOf)[0];
            case "orig-price":
                return a.orig_prices[0] - b.orig_prices[0];
            case "manufacturer":
                return a.manufacturer.localeCompare(b.manufacturer);
            default:
                throw new Error(`Unexpected orderBy value: ${orderBy}`);
        }
    });
    if (order === "desc") {
        sortedItemsWithIndices.reverse();
    }
    sortedItemsWithIndices.forEach((entry, index) => entry[1] = index);
    return unsortedItemsWithIndices.map(([_, index]) => index);
}

const filterMatches = (item: ClientDataItemType, filter: string): boolean => {
    if (filter === "") {
        return true;
    } else {
        const lowerCaseFilter = filter.replace(/\s+/g, " ").trim().toLowerCase();
        return !!item.names.find(name => name.toLowerCase().includes(lowerCaseFilter)) ||
            item.manufacturer.toLowerCase().includes(lowerCaseFilter);
    }
};

const includeMatches = (item: ClientDataItemType, include: IncludeType): boolean => {
    if (include === "all") {
        return true;
    } else {
        return item.type === "hybrid" || item.type === include;
    }
}

const calculateEnabledItems = (items: ClientDataItemType[], filter: string, include: IncludeType): boolean[] => {
    return items.map(item => {
        return filterMatches(item, filter) && includeMatches(item, include);
    })
}

type CardContainerProps = {
    data: ClientDataType,
    inflationData: InflationData,
    consolePictures: ReactNode[],
}

export default function CardContainer(props: CardContainerProps) {
    const {data, inflationData, consolePictures} = props;

    const [filterState, setFilterState] = useUrlState(
        DEFAULT_FILTER_STATE,
        deserializeUrlSearchParams,
        serializeUrlSearchParams,
    );

    const {filter, include, orderBy, order} = filterState;

    const asOf = filterState.asOf === "mostRecent" ? data.inflation_year_month : filterState.asOf;

    const sortedPositions = useMemo(
        () => calculateSortedPositions(inflationData, data.data, asOf, orderBy, order),
        [inflationData, data.data, asOf, orderBy, order]);

    const enabledItems = useMemo(
        () => calculateEnabledItems(data.data, filter, include),
        [data.data, filter, include]);

    const hasCards = useMemo(
        () => !!enabledItems.find(enabled => enabled === true),
        [enabledItems]);

    const cards = data.data.map((item, index) => {
        const position = sortedPositions[index];
        const enabled = enabledItems[index];
        const picture = consolePictures[index];
        return (
            <ConsoleCard
                key={index}
                order={position}
                item={item}
                enabled={enabled}
                asOf={asOf}
                inflationData={inflationData}
                picture={picture}
            />
        )
    })

    return (
        <>
            <div className={style.container}>
                <FilterBar filterState={filterState} setFilterState={setFilterState} data={data} />
                {cards}
            </div>

            {!hasCards && <NoResults />}
        </>
    )
}
