import {priceAfterInflation} from "../util/data";
import {useMemo} from "react";
import ConsoleCard from "./ConsoleCard";
import NoResults from "./NoResults";
import FilterBar from "./FilterBar/FilterBar";
import {compareYearMonth, YearMonth} from "../util/yearMonth";
import {FilterState, IncludeType, OrderByType, OrderType} from "../util/filterState";
import {useData} from "../util/useData";
import {DataItemType, InflationData} from "../util/loadData";
import style from "./CardContainer.module.scss";

const calculateSortedPositions = (inflationData: InflationData, items: DataItemType[], asOf: YearMonth, orderBy: OrderByType, order: OrderType): number[] => {
    // Create two lists - significantly, the _items_ in each list are the same.
    // The first list we leave unsorted while the second list is sorted.
    // After we sort the second list, we record the position of every item in that list.
    // Then, we can iterate through the unsorted items in the first list in order to create a
    // mapping of the unsorted position to the sorted position.
    const unsortedItemsWithIndices: [DataItemType, number][] = items.map(item => [item, -1]);
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

const filterMatches = (item: DataItemType, filter: string): boolean => {
    if (filter === "") {
        return true;
    } else {
        const lowerCaseFilter = filter.replace(/\s+/g, " ").trim().toLowerCase();
        return !!item.names.find(name => name.toLowerCase().includes(lowerCaseFilter)) ||
            item.manufacturer.toLowerCase().includes(lowerCaseFilter);
    }
};

const includeMatches = (item: DataItemType, include: IncludeType): boolean => {
    if (include === "all") {
        return true;
    } else {
        return item.type === "hybrid" || item.type === include;
    }
}

const calculateEnabledItems = (items: DataItemType[], filter: string, include: IncludeType): boolean[] => {
    return items.map(item => {
        return filterMatches(item, filter) && includeMatches(item, include);
    })
}

type CardContainerProps = {
    filterState: FilterState,
    setFilterState: (FilterState) => void,
}

export default function CardContainer(props: CardContainerProps) {
    const {filterState, setFilterState} = props;
    const {filter, include, orderBy, order} = filterState;
    const {data, inflationData} = useData();

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
        return (
            <ConsoleCard
                key={index}
                order={position}
                item={item}
                enabled={enabled}
                asOf={asOf}
            />
        )
    })

    return (
        <>
            <div className={style.container}>
                <FilterBar filterState={filterState} setFilterState={setFilterState} />
                {cards}
            </div>

            {!hasCards && <NoResults />}
        </>
    )
}
