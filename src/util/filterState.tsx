export type IncludeType = "all" | "home" | "handheld";
export type OrderByType = "year" | "price" | "orig-price" | "manufacturer";
export type OrderType = "asc" | "desc";

export type FilterState = {
    filter: string,
    include: IncludeType,
    orderBy: OrderByType,
    order: OrderType,
}

export const DEFAULT_FILTER_STATE: FilterState = {
    filter: "",
    include: "all",
    orderBy: "year",
    order: "desc",
};

const validateInclude = (arg: string): arg is IncludeType => ["all", "home", "handheld"].includes(arg);
const validateOrderBy = (arg: string): arg is OrderByType => ["year", "price", "orig-price", "manufacturer"].includes(arg);
const validateOrder = (arg: string): arg is OrderType => ["asc", "desc"].includes(arg);

export const validateIncludeOrDefault = (arg: string): IncludeType => validateInclude(arg) ? arg : "all";
export const validateOrderOrDefault = (arg: string): OrderType => validateOrder(arg) ? arg : "desc";
export const validateOrderByOrDefault = (arg: string): OrderByType => validateOrderBy(arg) ? arg : "year";

export const serializeUrlSearchParams = (state: FilterState): URLSearchParams => {
    return new URLSearchParams({
        filter: state.filter,
        include: state.include,
        orderBy: state.orderBy,
        order: state.order,
    })
}

export const deserializeUrlSearchParams = (searchParams: URLSearchParams): FilterState => {
    return {
        filter: searchParams.get("filter") || "",
        include: validateIncludeOrDefault(searchParams.get("include") || ""),
        orderBy: validateOrderByOrDefault(searchParams.get("orderBy") || ""),
        order: validateOrderOrDefault(searchParams.get("order") || ""),
    }
}
