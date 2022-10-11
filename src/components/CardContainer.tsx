import {styled} from "linaria/react";
import {priceAfterInflation} from "../util/data";
import {useMemo} from "react";
import ConsoleCard from "./ConsoleCard";
import NoResults from "./NoResults";
import FilterBar from "./FilterBar/FilterBar";
import {theme} from "./theme";
import {compareYearMonth} from "../util/yearMonth";
import {FilterState, IncludeType} from "../util/filterState";
import {useData} from "../util/useData";
import {DataItemType} from "../util/loadData";

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

const Container = styled.div`
    display: grid;
    gap: ${theme.gap}px;
    padding: ${theme.gap}px 0px;

    justify-content: center;
    grid-template-columns: [start] 325px [end];
    @media (min-width: ${theme.breakpoint}) {
        grid-template-columns: [start] repeat(auto-fill, 325px) [end];
    }
`;

type CardContainerProps = {
    filterState: FilterState,
    setFilterState: (FilterState) => void,
}

export default function CardContainer(props: CardContainerProps) {
    const {filterState, setFilterState} = props;
    const {filter, include, orderBy, order} = filterState;
    const {data, inflationData} = useData();

    const itemsWithOrder = useMemo(
        () => {
            // Re-order all of the items into the desired order. Along with the
            // item, we also store the items _original_ position.
            const reorderedItems: {item: DataItemType, originalIndex: number}[] = data.data.map((item, originalIndex) => {
                return {item, originalIndex}
            })
            reorderedItems.sort(({item: a}, {item: b}) => {
                switch (orderBy) {
                    case "year":
                        return compareYearMonth(a.release_year_month, b.release_year_month)
                    case "price":
                        return priceAfterInflation(inflationData, a, data.inflation_year_month)[0] - priceAfterInflation(inflationData, b, data.inflation_year_month)[0];
                    case "orig-price":
                        return a.orig_prices[0] - b.orig_prices[0];
                    case "manufacturer":
                        return a.manufacturer.localeCompare(b.manufacturer);
                    default:
                        throw new Error(`Unexpected orderBy value: ${orderBy}`);
                }
            });
            if (order === "desc") {
                reorderedItems.reverse();
            }

            // Create a new list - where all of the items are put back into their original
            // positions - but also now include their reordered index as well. We also
            // calculate the "enabled" flag based on the includes value here since it
            // doesn't change often or quickly.
            const itemsWithOrder: {item: DataItemType, index: number, enabled: boolean}[] = [];
            reorderedItems.forEach(({item, originalIndex}, index) => {
                const enabled = includeMatches(item, include);
                itemsWithOrder[originalIndex] = {item, index, enabled}
            })

            return itemsWithOrder;
        },
        [data, orderBy, order, include]
    );

    const items: {item: DataItemType, index: number, enabled: boolean}[] = useMemo(
        () => itemsWithOrder.map(({item, index, enabled}) => {
            return {item, index, enabled: enabled && filterMatches(item, filter)}
        }),
        [itemsWithOrder, filter]
    );

    const hasCards = useMemo(
        () => !!items.find(({enabled}) => enabled),
        [items]);

    const cards = items.map(({item, index, enabled}) => <ConsoleCard
        key={item.names[0]}
        order={index}
        item={item}
        enabled={enabled}
    />);

    return (
        <>
            <Container>
                <FilterBar filterState={filterState} setFilterState={setFilterState} />
                {cards}
            </Container>

            {!hasCards && <NoResults />}
        </>
    )
}
