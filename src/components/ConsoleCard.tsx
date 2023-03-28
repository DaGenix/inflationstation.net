import {priceAfterInflation} from "../util/data";
import React, {CSSProperties, ReactNode} from "react";
import {greaterThanOrEqual, YearMonth} from "../util/yearMonth";
import {ClientDataItemType, InflationData} from "../util/loadData";
import style from "./ConsoleCard.module.scss";

type ConsoleCardProps = {
    item: ClientDataItemType,
    enabled: boolean,
    order: number,
    asOf: YearMonth,
    inflationData: InflationData,
    picture: ReactNode,
}

const ConsoleCard = React.memo(function ConsoleCardInner(props: ConsoleCardProps) {
    const {item, enabled, order, asOf, inflationData, picture} = props;
    const current = greaterThanOrEqual(asOf, item.release_year_month);
    let price: string;
    if (current) {
        price = "$" + priceAfterInflation(inflationData, item, asOf).map(s => s.toLocaleString()).join("/$");
    } else {
        price = "Not Released";
    }
    return (
        <div
            className={style.paper}
            style={{
                "--opacity": current ? "1" : "0.5",
                "--order": order,
                "--display": enabled ? "flex" : "none",
            } as CSSProperties}
        >
            <h2>{item.names[0]}</h2>
            {item.affiliateLink && <a
                target="blank"
                rel="noopener"
                href={item.affiliateLink}
            >
                Buy
            </a>}
            <div className={style.spacer} />
            {picture}
            <h2>{price}</h2>
            <div>
                {item.manufacturer} - {item.release_year_month.year}
            </div>
            <div>
                Original Price{item.orig_prices.length > 1 ? "s" : ""}: ${item.orig_prices.map(s => s.toLocaleString()).join("/$")}
            </div>
        </div>
    )
});

export default ConsoleCard;
