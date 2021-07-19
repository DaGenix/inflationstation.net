export type IncludeType = "all" | "home" | "handheld";
export type OrderByType = "year" | "price" | "orig-price" | "manufacturer";
export type OrderType = "asc" | "desc";

const validateInclude = (arg: string): arg is IncludeType => ["all", "home", "handheld"].includes(arg);
const validateOrderBy = (arg: string): arg is OrderByType => ["year", "price", "orig-price", "manufacturer"].includes(arg);
const validateOrder = (arg: string): arg is OrderType => ["asc", "desc"].includes(arg);

export const validateIncludeOrDefault = (arg: string): IncludeType => validateInclude(arg) ? arg : "all";
export const validateOrderByOrDefault = (arg: string): OrderByType => validateOrderBy(arg) ? arg : "year";

export const makeUrlSearchParams = (filter: string, include: IncludeType, orderBy: OrderByType, order: OrderType): URLSearchParams => {
    if (filter === "" && include === "all" && orderBy === "year" && order === "desc") {
        return new URLSearchParams();
    } else {
        return new URLSearchParams([
            ["filter", filter],
            ["include", include],
            ["orderBy", orderBy],
            ["order", order],
        ]);
    }
}

type ReadUrlOutput = {
    filter: string,
    include: IncludeType,
    orderBy: OrderByType,
    order: OrderType,
}

export const parseUrlSearchParams = (searchParams: URLSearchParams): ReadUrlOutput => {
    const filter = searchParams.get("filter") || "";
    const include = searchParams.get("include");
    const orderBy = searchParams.get("orderBy");
    const order = searchParams.get("order");
    return {
        filter,
        include: validateInclude(include) ? include : "all",
        orderBy: validateOrderBy(orderBy) ? orderBy : "year",
        order: validateOrder(order) ? order : "desc",
    }
}
