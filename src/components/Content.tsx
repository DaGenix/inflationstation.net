import {Box} from "@material-ui/core";
import ConsoleCard from './ConsoleCard';
import {DataItemType, DataType} from "../util/data";
import {useMemo} from "react";
import {IncludeType, makeUrlSearchParams, parseUrlSearchParams} from "../util/urlUtil";
import FilterBar from "./FilterBar";

const filterMatches = (item: DataItemType, filter: string): boolean => {
    if (filter === "") {
        return true;
    } else {
        return item.name.toLowerCase().includes(filter.toLowerCase()) || item.manufacturer.toLowerCase().includes(filter.toLowerCase());
    }
};

const includeMatches = (item: DataItemType, include: IncludeType): boolean => {
    if (include === "all") {
        return true;
    } else {
        return item.type === "hybrid" || item.type === include;
    }
}

type ContentProps = {
    data: DataType,
    urlSearchParams: URLSearchParams,
    setUrlSearchParams: (URLSearchParams) => void,
}

export default function Content(props: ContentProps) {
    const {data, urlSearchParams, setUrlSearchParams} = props;

    const {filter, include, orderBy, order} = parseUrlSearchParams(urlSearchParams);

    const setFilter = value => setUrlSearchParams(makeUrlSearchParams(value, include, orderBy, order));
    const setInclude = value => setUrlSearchParams(makeUrlSearchParams(filter, value, orderBy, order));
    const setOrderBy = value => setUrlSearchParams(makeUrlSearchParams(filter, include, value, order));
    const setAscending = value => setUrlSearchParams(makeUrlSearchParams(filter, include, orderBy, value ? "asc" : "desc"));

    const items = useMemo(() => {
            const items = data.data
                .sort((a, b) => {
                    switch (orderBy) {
                        case "year":
                            return a.year - b.year;
                        case "price":
                            return a.raw_prices[0] - b.raw_prices[0];
                        case "orig-price":
                            return a.raw_orig_prices[0] - b.raw_orig_prices[0];
                        case "manufacturer":
                            return a.manufacturer.localeCompare(b.manufacturer);
                        default:
                            throw new Error(`Unexpected orderBy value: ${orderBy}`);
                    }
                })
                .map((item): [DataItemType, boolean] => {
                    const enabled = filterMatches(item, filter) && includeMatches(item, include);
                    return [item, enabled];
                });
            if (order === "desc") {
                items.reverse();
            }
            return items;
        },
        [data.data, filter, include, orderBy, order]);

    const cards = items.map(([item, enabled]) => <ConsoleCard
        key={item.name}
        item={item}
        enabled={enabled}
    />);

    return (
        <Box component="main" sx={{
            backgroundColor: "#f1f1f1",
        }}
        >
            <FilterBar
                filter={filter}
                setFilter={setFilter}
                include={include}
                setInclude={setInclude}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
                order={order}
                setAscending={setAscending}/>

            <Box
                sx={{
                    p: 1,
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(auto-fill, minmax(275px, 1fr))",
                    },
                    gap: 1,
                }}
            >
                {cards}
            </Box>
        </Box>
    );
}
