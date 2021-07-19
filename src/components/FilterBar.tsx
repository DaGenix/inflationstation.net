import {Box, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {IncludeType, OrderByType, OrderType, validateIncludeOrDefault, validateOrderByOrDefault} from "../util/urlUtil";
import {useEffect, useState} from "react";
import useDelayedValue from "../util/useDelayedValue";

type FilterBarProps = {
    filter: string,
    setFilter: (string) => void,
    include: IncludeType,
    setInclude: (IncludeType) => void,
    orderBy: OrderByType,
    setOrderBy: (OrderByType) => void,
    order: OrderType,
    setAscending: (boolean) => void,
}

export default function FilterBar(props: FilterBarProps) {
    const {
        filter,
        setFilter,
        include,
        setInclude,
        orderBy,
        setOrderBy,
        order,
        setAscending,
    } = props;

    const [displayFilter, setDisplayFilter] = useState(filter);
    const saveFilter = useDelayedValue(displayFilter, 250);

    useEffect(() => {
            if (filter !== saveFilter) {
                setFilter(saveFilter);
            }
        },
        [filter, saveFilter]);

    const onSetFilter = (e) => setDisplayFilter(e.target.value);
    const onSetInclude = (e) => setInclude(validateIncludeOrDefault(e.target.value));
    const onSetOrderBy = (e) => setOrderBy(validateOrderByOrDefault(e.target.value));
    const onSetAscending = (e) => setAscending(e.target.value === "asc");

    return (
        <Box
            className="hide-without-js"
            sx={{
                pr: 1,
                display: "flex",
                flexFlow: "row wrap",
                justifyContent: "flex-end",
                alignItems: "baseline",
                gap: 1,
            }}
        >
            <TextField
                size="small"
                margin="dense"
                placeholder="Filter"
                label="Filter"
                value={displayFilter}
                onChange={onSetFilter}
            />
            <FormControl>
                <InputLabel>Type</InputLabel>
                <Select
                    label="Type"
                    size="small"
                    margin="dense"
                    value={include}
                    onChange={onSetInclude}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="home">Home</MenuItem>
                    <MenuItem value="handheld">Handheld</MenuItem>
                </Select>
            </FormControl>

            <Box
                sx={{
                    display: "flex",
                    flexFlow: "row nowrap",
                    alignItems: "baseline",
                    gap: 1,
                }}
            >
                <FormControl>
                    <InputLabel>Sort</InputLabel>
                    <Select
                        label="Sort"
                        size="small"
                        margin="dense"
                        value={orderBy}
                        onChange={onSetOrderBy}
                    >
                        <MenuItem value="year">Year</MenuItem>
                        <MenuItem value="price">Today's Price</MenuItem>
                        <MenuItem value="orig-price">Original Price</MenuItem>
                        <MenuItem value="manufacturer">Manufacturer</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel>Order</InputLabel>
                    <Select
                        label="Order"
                        size="small"
                        margin="dense"
                        value={order}
                        onChange={onSetAscending}
                    >
                        <MenuItem value="asc">Ascending</MenuItem>
                        <MenuItem value="desc">Descending</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
}
